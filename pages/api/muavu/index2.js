import { da } from "date-fns/locale";
import { authMiddleware } from "../../../middleware/auth";
import prisma from "../../../prisma/prisma";

const handler = async (req, res) => {
  const data = req.body;
  const id = data?.id;
  let result = {};

  try {
    switch (req.method) {
      case "POST":
        if (!id) {
          result = await prisma.nhatky.create({ data });
          res.status(201).json(result);
        } else {
          result = await prisma.nhatky.update({
            where: { id },
            data,
          });
          res.status(201).json(result);
        }
        
        break;
      case "GET":
        if (!id) {
          result = await prisma.nhatky.findMany({
            take: 10,
          });
          res.status(200).json(result);
        } else {
          result = await prisma.nhatky.findUnique({
            where: {
              id,
            },
          });
          res.status(200).json(result);
        }
        break;
      case "DELETE":
        if (id) {
          result = await prisma.nhatky.delete({
            where: {
              id,
            },
          });
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
