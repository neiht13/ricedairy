
import jwt from 'jsonwebtoken';
import cors, { runMiddleware } from '../../middleware/cors';
import prisma from '../../prisma/prisma';
import clientPromise from "../../mongo/client";
import {ObjectId} from "mongodb";

const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  // console.log(req.method);
  // console.log(req.body);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  try {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    let whereClause;

    if (isPhoneNumber(username)) {
      whereClause = {
        phone: username ?? "",
      };
    } else {
      whereClause = {
        username: username ?? "",
      };
    }

    const { db } = await clientPromise;
    const acocuntdb = db.collection("accountnew");
    const userdb = db.collection("usernew");
    const account = await acocuntdb.findOne(whereClause);

    const usernew = await userdb.findOne({accountId: account._id.toString()});

    console.log('account._id.toString()', account._id.toString());
    console.log('usernew', usernew);
    console.log('account', account);

  // Giả sử username và password đúng
    if (account && password === account.password) {
      const token = jwt.sign({ username, role: account.role[0] }, SECRET_KEY, { expiresIn: '69y' });
      console.log(token);
      res.status(200).json({ token, uId: usernew._id.toString() , xId: account.xId, role: account.role[0]});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
}

function isPhoneNumber(text) {
  // Đây là một regex đơn giản cho số điện thoại, bạn có thể thay đổi cho phù hợp
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(text);
}
