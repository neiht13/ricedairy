import { runMiddleware } from '../../../middleware/cors';
import cors from '../../../middleware/cors';
import { authMiddleware } from '../../../middleware/auth';

// Giả lập database
let users = [];

async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;
  const userIndex = users.findIndex(user => user.id === id);

  switch (req.method) {
    case 'GET':
      if (userIndex !== -1) {
        return res.status(200).json(users[userIndex]);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    case 'PUT':
      if (userIndex !== -1) {
        users[userIndex] = req.body;
        return res.status(200).json(users[userIndex]);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    case 'DELETE':
      if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        return res.status(200).json(deletedUser);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

export default authMiddleware(handler);
