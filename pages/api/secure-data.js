// pages/api/secure-data.js
import jwt from 'jsonwebtoken';
import cors, { runMiddleware } from "../../middleware/cors";
const SECRET_KEY = process.env.JWT_SECRET;

async function handler(req, res) {
  runMiddleware(req, res, cors);
  console.log(req.method);
  const token = req.headers.authorization?.split(" ")[1];
  console.log('token', token);
  if (token) {
    try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("decoded", decoded);
    req.user = decoded;

    if (req.method === "GET") {
      res.status(200).json({ message: "This is secure data", user: req.user });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.log("error", error.message);
    res.status(200).json({ message: 'Vui lòng đăng nhập!' });
  }
}
}

export default handler;
