import { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import prisma from "@/prisma/prisma";


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const short = req.query?.short
		if (short){
			// @ts-ignore
			const d = await prisma.qRconfig.findUnique({
				where: {
					shortUrl: short
				},
				include: {
					qrconfig: true,user: true
				},
			})
			return res.status(200).json(d)
		} else {
			// @ts-ignore
			const d = await prisma.qRconfig.findMany({
				include: {
					qrconfig: true,user: true
				},
			})
			return res.status(200).json(d)
		}

	}
	if (req.method === "POST") {
		const body = req.body;
		const id = body.id;
		const linkId = body.linkId;
		delete body.linkId
		delete body.id
		console.log('body',body)
		if (id) {
			// @ts-ignore
			const d = await prisma.qRconfig.update({data: body, where: {id}})
			return res.status(200).json(d)
		} else {
			// @ts-ignore
			const d = await prisma.qRconfig.create({data: body})
			console.log('d', d)
			// @ts-ignore
			await prisma.link.update({data: {
					qrconfigId: d.id
				},
				where: {id: linkId}
			})
			return res.status(200).json(d)
		}


	}
	if (req.method === "DELETE") {
		const body = req.body;
		const id = body.id;
		delete body.id;
		// @ts-ignore
		const d = await prisma.qRconfig.delete({where: {id}})
		return res.status(200).json(d)
	}

}
