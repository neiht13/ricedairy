import { authMiddleware } from "../../../middleware/auth";
import clientPromise from "../../../mongo/client";
import { ObjectId } from "mongodb";

/**
 * @swagger
 * /api/nhatky:
 *   get:
 *     description: Returns a greeting
 *     responses:
 *       200:
 *         description: Successful response
 */
const handler = async (req, res) => {
  const data = req.body;
  const idQuery = req.query?.id;
  console.log("data", data);
  
  const id = data?.id;
  delete data.id;
  let result = {};

  try {
    const { db} = await clientPromise;
    const collection = db.collection("nhatkynew");

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
          );
          res.status(201).json(result);
          console.log(result, 'result');
        }
      } catch (error) {
        res.status(500).json({ error });
      }
        break;
      case "GET":
        if (!idQuery) {
          result = await collection.find({}).toArray();
          res.status(200).json(result);
        } else {
          result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
          res.status(200).json(result);
        }
        break;
      case "DELETE":
        if (idQuery) {
          result = await collection.deleteOne({ _id: ObjectId.createFromHexString(idQuery) });
          res.status(200).json(result);
        } else {
          res.status(200).end(`Provide id`);
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
