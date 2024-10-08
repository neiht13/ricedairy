import { NextApiRequest, NextApiResponse } from "next"
// @ts-ignore
import prisma from "@/prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/authnext/[...nextauth]";
import dayjs from "dayjs";


/**
 * @swagger
 * /api/example:
 *   get:
 *     description: Returns a list of items
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const body = req.body;
			// @ts-ignore
			const d = await prisma.account.create({data: {
				...body,
					role: ['User'],
					status: true
				}})
			return res.status(200).json(d)
	}
	res.end()

}
