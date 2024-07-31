import jwt from 'jsonwebtoken';
import cors, { runMiddleware } from './cors';

const SECRET_KEY = process.env.JWT_SECRET;

export function authMiddleware(handler) {
  return async (req, res) => {
    await runMiddleware(req, res, cors);

    console.log(req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
