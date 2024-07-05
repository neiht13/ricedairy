'use server'

// @ts-ignore
import prisma from "@/prisma/prisma";

// @ts-ignore
export const createGiaidoan = async (req) => {

	const id = req.id

	delete req.id
	if (id){
	// @ts-ignore
	const data = await prisma.phanthuoc.update({
		data: req,
		where: id
	}
	)
	} else{
	// @ts-ignore
	const data = await prisma.phanthuoc.create({
		data: req
	})
	return data
	}


}

// @ts-ignore
export const updateUser = async (user) => {
	const id = user.id

	delete user.id
	// @ts-ignore
	const data = await prisma.phanthuoc.update({
		data: user,
		where: id
	}
	)
	return data
}

// @ts-ignore
export const findOneMuavu = async (id) => {
	// @ts-ignore
	const data = await prisma.phanthuoc.findUnique({
		where: {
			id: id
		}
	})
	return data
}
export const findAll = async () => {
	// @ts-ignore
	const data = await prisma.phanthuoc.findMany()
	return data
}