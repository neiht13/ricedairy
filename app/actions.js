"use server";

import prisma  from "../prisma/prisma";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export const getAllLink = async (shortUrl) => {
	const session = await getServerSession(authOptions)
	console.log(session)
	if (session) {
		const d = await prisma.link.findMany({
			where:{
				userCreated: session?.user?.uId
			},
			include: {
				qrconfig: true,
				user: true
			},
			orderBy: {
				dateCreated: 'desc',
			}
		})
		return d
	}
	return null
};
