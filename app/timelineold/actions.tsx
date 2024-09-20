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
export const findOneMuavu = async (id) => {
	// @ts-ignore
	const data = await prisma.muavu.findUnique({
		where: {
			id: id
		}
	})
	return data
}
export const findAll = async (user) => {
	// @ts-ignore
	const data = await prisma.nhatky.findMany({
		where: {
			user: user
		},
		include: {
			congviecObject: true
		}
	}) || []
	return data
}