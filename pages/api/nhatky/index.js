import { authMiddleware } from "../../../middleware/auth";
import clientPromise from "../../../mongo/client";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  const {db} = await clientPromise;

  const data = req.body;
  const idQuery = req.query?.id;
  const uId = req.query?.uId;
  const xId = req.query?.xId;

  const id = data?.id;
  delete data.id;
  let result = {};

  try {
    const collection = db.collection("nhatkynew");

    switch (req.method) {
      case "POST":
        try {
          if (!id) {
            // Thêm mới tài liệu nhatkynew
            const iid = new ObjectId();
            result = await collection.insertOne({ ...data, _id: iid });

            // Đồng bộ agrochemicals
            await syncAgrochemicals(data.agrochemicals || [], iid);
            res.status(201).json(result);
          } else {
            // Cập nhật tài liệu nhatkynew
            const objectId = ObjectId.createFromHexString(id);
            result = await collection.updateOne(
              { _id: objectId },
              { $set: data }
            );

            // Đồng bộ agrochemicals
            await syncAgrochemicals(data.agrochemicals || [], objectId);
            res.status(200).json(result);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: error.message });
        }
        break;

      case "GET":
        if (!idQuery && uId) {
          result = await collection.find({ uId: uId }).toArray();
          res.status(200).json(result);
        } else if (xId) {
          result = await collection.find({ xId: xId }).toArray();
          res.status(200).json(result);
        } else if (idQuery) {
          result = await collection.findOne({
            _id: ObjectId.createFromHexString(idQuery),
          });
          res.status(200).json(result);
        } else {
          res.status(400).json({ error: "Invalid query parameters" });
        }
        break;

      case "DELETE":
        if (idQuery) {
          // Xóa tài liệu nhatkynew
          result = await collection.deleteOne({
            _id: ObjectId.createFromHexString(idQuery),
          });

          // Xóa tất cả agrochemicals liên kết
          await db.collection("agrochemicals").deleteMany({ farmingLogId: ObjectId.createFromHexString(idQuery) });

          res.status(200).json(result);
        } else {
          res.status(400).json({ error: "Provide id" });
        }
        break;

      default:
        res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const upsertAgrochemicals = async (agrochemical, farmingLogId) => {
  const {db} = await clientPromise;

  const collectionAgrochemicals = db.collection("agrochemicals");
  const id = agrochemical.id;
  delete agrochemical.id;
  let result = {};

  if (id) {
    // Cập nhật nếu agrochemical đã tồn tại
    result = await collectionAgrochemicals.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { ...agrochemical, farmingLogId } }
    );
  } else {
    // Thêm mới nếu agrochemical chưa tồn tại
    result = await collectionAgrochemicals.insertOne({
      ...agrochemical,
      farmingLogId,
    });
  }

  return result;
};

const syncAgrochemicals = async (incomingAgrochemicals, farmingLogId) => {
  const {db} = await clientPromise;

  const collectionAgrochemicals = db.collection("agrochemicals");

  // Lấy danh sách các ID từ incoming data
  const incomingIds = incomingAgrochemicals
    .filter(agro => agro.id)
    .map(agro => ObjectId.createFromHexString(agro.id));

  // Lấy tất cả các agrochemicals hiện có liên kết với farmingLogId
  const existingAgrochemicals = await collectionAgrochemicals.find({ farmingLogId }).toArray();

  const existingIds = existingAgrochemicals.map(agro => agro._id);

  // Các agrochemicals cần xóa (tồn tại trong DB nhưng không trong incoming data)
  const toDelete = existingIds.filter(id => !incomingIds.includes(id));

  // Xóa các agrochemicals không còn tồn tại trong incoming data
  if (toDelete.length > 0) {
     await collectionAgrochemicals.deleteMany({ _id: { $in: toDelete } });
  }

  // Cập nhật hoặc thêm mới các agrochemicals từ incoming data
  for (const agro of incomingAgrochemicals) {
    await upsertAgrochemicals(agro, farmingLogId);
  }
};

export default authMiddleware(handler);
