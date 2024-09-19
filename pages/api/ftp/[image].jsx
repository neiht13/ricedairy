import { getFtpClient, closeFtpClient } from './ftp-client';
import { Writable } from 'stream';
import { authMiddleware } from '../../../middleware/auth';
import { lookup } from 'mime-types';

async function handler(req, res) {
  const { image } = req.query;

  // Basic input validation to prevent unauthorized file access
  if (!image || typeof image !== 'string' || image.includes('..')) {
    return res.status(400).send('Invalid image path.');
  }

  const client = await getFtpClient();

  try {
    // Determine the content type based on the file extension
    const contentType = lookup(image) || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    // Use a writable stream that writes directly to the response
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        res.write(chunk, encoding, callback);
      },
      final(callback) {
        res.end(callback);
      }
    });

    // Download the file from the FTP server and pipe directly to the response
    await client.downloadTo(writableStream, image);

  } catch (error) {
    console.error('Error downloading image from FTP:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Ensure the FTP client is always closed
    await closeFtpClient(client);
  }
}

export default authMiddleware(handler);
