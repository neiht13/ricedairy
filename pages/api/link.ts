import { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import prisma from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import dayjs from "dayjs";


export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions)
	const short = req.query?.short
	if (short){
		// @ts-ignore
		const d = await prisma.link.findUnique({
			where: {
				shortUrl: short
			},
		})
		// @ts-ignore
		await prisma.link.update({data: {
				totalView: d.totalView + 1,
				lastView: dayjs()
			}, where: {id: d.id}})
		return res.status(200).json(d)
	}
	if (req.method === "POST") {
		const body = req.body;
		const id = body.id;
		if (!id) {
			// @ts-ignore
			const d = await prisma.link.create({data: body})
			return res.status(200).json(d)
		}
	}
	if (session) {
	if (req.method === "GET") {
		if (short){
			// @ts-ignore
			const d = await prisma.link.findUnique({
				where: {
					// @ts-ignore
					shortUrl: short
				},
				include: {
					qrconfig: true,user: true
				},
			})
			return res.status(200).json(d)
		} else {
			// @ts-ignore
			const d = await prisma.link.findMany({
				where:{
					userCreated: session?.user?.uId
				},
				include: {
					qrconfig: true, user: true
				},
				orderBy: {
					dateCreated: 'desc',
				}
			})
			return res.status(200).json(d)
		}

	}
	if (req.method === "POST") {
		const body = req.body;
		const id = body.id;
		if (id) {
			delete body.id;
			// @ts-ignore
			const d = await prisma.link.update({data: body, where: {id}})
			return res.status(200).json(d)
		} else {
			// @ts-ignore
			const d = await prisma.link.create({data: body})
			return res.status(200).json(d)
		}
	}
	if (req.method === "DELETE") {
		const id = req.query?.id;
		// @ts-ignore
		const d = await prisma.link.delete({where: {id}})
		return res.status(200).json(d)
	}
	} else {
		// Not Signed in
		res.status(401)
	}
	res.end()

}
