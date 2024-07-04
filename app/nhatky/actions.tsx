'use server'

// @ts-ignore
import prisma from "@/prisma/prisma";


// @ts-ignore
export const createNhatky = async (req) => {
	// @ts-ignore
	const data = await prisma.nhatky.create({
		data: req
	})
	return data
}

// @ts-ignore
export const updateNhatky = async (req) => {
	const id = req.id

	// @ts-ignore
	const data = await prisma.nhatky.update({
			data: req,
			where: id
		}
	)
	return data
}
// @ts-ignore
export const findOneNhatky = async (id) => {
	// @ts-ignore
	const data = await prisma.nhatky.findUnique({
		where: {
			id
		}
	})
	return data
}