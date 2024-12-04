import { authMiddleware } from "../../../middleware/auth";
import clientPromise from "../../../mongo/client";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  const data = req.body;
  const idQuery = req.query?.id;
  const uId = req.query?.uId;
  const farmingLogId = req.query?.farmingLogId;
  

  
  const id = data?._id;
  delete data._id;


  let result = {};

  try {
    const { db} = await clientPromise;
    const collection = db.collection("agrochemicals");

    switch (req.method) {
      case "POST":
        try {
          
        if (!id) {
          result = await collection.insertOne(data);
          res.status(201).json(result);
        } else {
       
          result = await collection.updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: data }
          );``
          res.status(201).json(result);
        }
      } catch (error) {
        res.status(500).json({ error });
      }
        break;
      case "GET":
        if (idQuery) {
          result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
          res.status(404).json(result);
        } else {
          if (farmingLogId) {
            result = await collection.find({ farmingLogId: farmingLogId }).toArray();
            res.status(200).json(result);
          } else {

            res.status(200).json([])
          }
        }
        
        break;
      case "DELETE":
        if (idQuery) {
          result = await collection.deleteOne({ _id: ObjectId.createFromHexString(idQuery) });
          res.status(200).json(result);
        } else {
          res.status(404).end(`Provide id`);
        }
        break;
      default:
        res.status(404).end(`Not Found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default authMiddleware(handler);
