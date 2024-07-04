// pages/api/uploadImage.js
import { getFtpClient, closeFtpClient } from './ftp-client';
import {PassThrough, Readable} from "stream";
import fs, {createReadStream} from "fs";

function generateRandomNumber() {
	const randomNumber = Math.floor(Math.random() * 100000000);
	const formattedNumber = randomNumber.toString().padStart(8, '0');
	return formattedNumber;
}

export default async function handler(req, res) {
	const { imageName, imageData } = req.body;
	const randomText = generateRandomNumber();
	const client = await getFtpClient();
	try {
		const remotePath = randomText+ imageName; // Đường dẫn trên FTP server
		const data = 	imageData.replace(/^data:image\/\w+;base64,/, '');
		const imageBuffer = Buffer.from(data, 'base64');
		const imageStream = new PassThrough();
		imageStream.end(imageBuffer);
		await client.uploadFrom(imageStream, remotePath);
		res.status(200).json({ success: true, message: 'Image uploaded successfully', path: remotePath});
	} catch (error) {
		console.error('Error uploading image to FTP:', error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	} finally {
		await closeFtpClient(client);
	}
}
