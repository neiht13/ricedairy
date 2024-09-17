import prisma from "../../../prisma/prisma";
import { runMiddleware } from '../../../middleware/cors';
import cors from '../../../middleware/cors';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns a list of items
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
async function handler(req, res) {
    runMiddleware(req, res, cors);
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log("decoded", decoded);
      if(decoded.role !== 'admin') {
        req.user = decoded;
        if (req.method === "GET") {
          const users = await prisma.user.findMany();
          console.log("users", users);
          res.status(200).json({ data: users });
        } else {
          res.status(405).json({ message: "Method not allowed" });
        }
      }
      
    } catch (error) {
      console.log("error", error.message);
      res.status(200).json({ message: 'Vui lòng đăng nhập!' });
    }
  } else {
    res.status(401).json({ message: 'Vui lòng đăng nhập!' });
  }

}
  
  export default handler;