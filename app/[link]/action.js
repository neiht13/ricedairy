"use server";

import { revalidatePath } from "next/cache";
import prisma  from "../../prisma/prisma";

export const getLink = (shortUrl) => {
	return prisma.link.findUnique({
		where: {
			shortUrl,
		},
	});
};
