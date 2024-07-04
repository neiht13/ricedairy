'use server'

// @ts-ignore
import prisma from "@/prisma/prisma";


// @ts-ignore
export const createMuavu = async (req) => {
		const id = req.id
		if (!id){
			const data = await prisma.muavu.create({
				data: req
			})
			return data
		}
		else {
			delete req.id
			// @ts-ignore
			const data = await prisma.muavu.update({
				data: req,
				where: id
			}
			)
		}
}


// @ts-ignore
export const updateUser = async (user) => {
	const id = user.id

	delete user.id
	// @ts-ignore
	const data = await prisma.user.update({
		data: user,
		where: id
	}
	)
	return data
}

// @ts-ignore
export const findOneMuavu = async (id) => {
	// @ts-ignore
	const data = await prisma.muavu.findUnique({
		where: {
			id: id
		}
	})
	return data
}
export const findAllMuavu = async () => {
	// @ts-ignore
	const data = await prisma.muavu.findMany()
	return data
}