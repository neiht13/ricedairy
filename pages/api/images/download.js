import fs from 'fs';
import path from 'path';
import cors, { runMiddleware } from '../../../middleware/cors';

export default async function handler(req, res) {
  const { filename } = req.query;
  await runMiddleware(req, res, cors);


  if (!filename) {
    return res.status(400).json({ error: 'Cần cung cấp filename' });
  }

  const sanitizedFilename = path.basename(filename);
  const filePath = path.join(process.cwd(), '../Images', sanitizedFilename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Không tìm thấy file' });
    }

    const fileExtension = path.extname(sanitizedFilename).toLowerCase();
    let contentType = 'application/octet-stream';

    // Xác định Content-Type dựa trên phần mở rộng file
    if (fileExtension === '.png') contentType = 'image/png';
    else if (fileExtension === '.jpg' || fileExtension === '.jpeg') contentType = 'image/jpeg';
    else if (fileExtension === '.gif') contentType = 'image/gif';

    res.setHeader('Content-Type', contentType);

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
}


