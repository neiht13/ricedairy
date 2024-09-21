import {authMiddleware} from "../../../middleware/auth";
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), '../Images');

const ensureUploadDirExists = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

 const handler = async (req, res) => {
  if (req.method === 'POST') {
    ensureUploadDirExists();

    const { imageName, imageData } = req.body;

    if (!imageName || !imageData) {
      return res.status(400).json({ error: 'Cần cung cấp imageName và imageData' });
    }

    // Loại bỏ tiền tố 'data:image/png;base64,' nếu có
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const filePath = path.join(uploadDir, imageName);

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error('Lỗi khi lưu file:', err);
        return res.status(500).json({ error: 'Lỗi khi lưu file' });
      }
      return res.status(200).json({ message: 'Upload thành công', imageName });
    });
  } else {
    res.status(405).json({ error: 'Phương thức không được hỗ trợ' });
  }
}

export default authMiddleware(handler);
