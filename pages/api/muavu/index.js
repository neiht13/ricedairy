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
  console.log("data", data);
  
  const id = data?.id;
  let result = {};

  try {
    const { db} = await clientPromise;
    const collection = db.collection("muavunew");

    switch (req.method) {
      case "POST":
        try {
        if (!id) {
          result = await collection.insertOne(data);
          res.status(201).json(result.ops[0]);
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
        if (!id) {
          result = await collection.find({}).toArray();
          res.status(200).json(result);
        } else {
          result = await collection.findOne({ _id: ObjectId.createFromHexString(id) });
          res.status(200).json(result);
        }
        break;
      case "DELETE":
        if (id) {
          result = await collection.deleteOne({ _id: ObjectId.createFromHexString(id) });
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
