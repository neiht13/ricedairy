import {authMiddleware} from "../../../middleware/auth";
import {ObjectId} from "mongodb";
import clientPromise from "../../../mongo/client";
// POST handler
const handlePost = async (req, res, collection) => {
  const data = req.body;
  const id = data?.id;
  delete data.id;

  if (!id) {
    const result = await collection.insertOne(data);
    res.status(201).json(result.ops[0]);
  } else {
    const result = await collection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data }
    );
    res.status(201).json(result);
  }
};

// GET handler
const handleGet = async (req, res, collection) => {
  const idQuery = req.query?.id;
  const xId = req.query?.xId;
  console.log('idQuery', idQuery)
  if (idQuery) {
    const result = await collection.findOne({ _id: ObjectId.createFromHexString(idQuery) });
    res.status(200).json([result]);
  } else if(xId) {
    const result = await collection.find({xId: xId}).toArray();
    res.status(200).json(result);
  } else {
    const result = await collection.find({}).toArray();
    res.status(200).json(result);
  }
};

// DELETE handler
const handleDelete = async (req, res, collection) => {
  const idQuery = req.query?.id;

  if (idQuery) {
    const result = await collection.deleteOne({ _id: ObjectId.createFromHexString(idQuery) });
    res.status(200).json(result);
  } else {
    res.status(400).send("Provide id");
  }
};

// Main handler
const handler = async (req, res) => {
  try {
    const { db } = await clientPromise;
    const collection = db.collection("usernew");

    switch (req.method) {
      case "POST":
        await handlePost(req, res, collection);
        break;
      case "GET":
        await handleGet(req, res, collection);
        break;
      case "DELETE":
        await handleDelete(req, res, collection);
        break;
      default:
        res.status(404).end("Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default authMiddleware(handler);
