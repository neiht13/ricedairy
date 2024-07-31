
import jwt from 'jsonwebtoken';
import cors, { runMiddleware } from '../../middleware/cors';
import prisma from '../../prisma/prisma';

const SECRET_KEY = process.env.JWT_SECRET;

export default async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  console.log(req.method);
  console.log(req.body);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await prisma.account.findUnique({
      where: {
        username: req.body.username,
      },
    });
    console.log("user", user);
    // Giả sử username và password đúng
    if (user && username === user.username && password === user.password) {
      const token = jwt.sign({ username, role: user.role[0] }, SECRET_KEY, { expiresIn: '69y' });
      console.log(token);
      res.status(200).json({ token, user: user.username , role: user.role[0]});
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
