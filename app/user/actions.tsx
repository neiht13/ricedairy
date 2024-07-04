'use server'

// @ts-ignore
import prisma from "@/prisma/prisma";


// @ts-ignore
export const createUser = async (req) => {
	// @ts-ignore
	const data = await prisma.nhatky.create({
		data: req
	})
	return data
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
export const findOneUser = async (id) => {
	// @ts-ignore
	const data = await prisma.user.findUnique({
		where: {
			id: id
		}
	})
	return data
}
export const findAll = async () => {
	// @ts-ignore
	const data = await prisma.user.findMany(
	)
	return data
}