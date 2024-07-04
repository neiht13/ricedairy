import {getFtpClient, closeFtpClient} from './ftp-client';
import path from "path";
import {Writable} from "stream";

const ftp = require("basic-ftp");

export default async function handler(req, res) {
	const {image} = req.query;
	const client = await getFtpClient()
	try {
		const writableStream = new Writable();
		writableStream._write = (chunk, encoding, callback) => {
			res.write(chunk, encoding);
			callback();
		};
		await client.downloadTo(writableStream, image)

		res.setHeader('Content-Type', 'image/png'); // Thay đổi kiểu ảnh nếu cần
		writableStream.pipe(res);

	} catch (error) {
		console.error('Error downloading image from FTP:', error);
		res.status(500).end('Internal Server Error');
	} finally {
		await closeFtpClient(client);
	}

}