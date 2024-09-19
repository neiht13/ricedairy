var ftp = require('basic-ftp');

export async function getFtpClient() {
	const client = new ftp.Client()
	try {
		await client.access({
			host: process.env.FTP_HOST,
			user: process.env.FTP_USER,
			password: process.env.FTP_PASS,
			secure: false,
		});
	} catch (error) {
		console.log(error);
		
	}

	// await client.access({
	// 	host: '123.30.191.203',
	// 	user: 'khoailangchauthanhdt',
	// 	password: 'cNp04_snBh@j6Mfk',
	// 	secure: false,
	// });
	await client.ensureDir('photo');
	return client;

}

export async function closeFtpClient(client) {
	if (client) {
		await client.close();
	}
}