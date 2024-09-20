
import {redirect} from "next/navigation";
import Image from "next/image";
import prisma from "../../prisma/prisma";
import dayjs from "dayjs";
import {SaveAllIcon} from "lucide-react";
import {Button} from "../../components/ui/button";
import Notfound from "./notfound";

const HomePage = async ({params}) => {
	// const short = params.link;
	//
	// const d = await prisma.link.findUnique({
	// 	where: {
	// 		shortUrl: short
	// 	},
	// })
	// const link = d?.originalUrl;
	// if (link) {
	// 	await prisma.link.update({data: {
	// 			totalView: d?.totalView + 1,
	// 			lastView: dayjs()
	// 		}, where: {id: d?.id}})
	// 	await redirect(link); // Chuyển hướng sang trang mới
	// } else {
	// 	// @ts-ignore
	//
	// 	return (
	// 		<Timeline/>
	// 	);
	// }

	return (
		<Timeline/>
	);
};

export default HomePage;
