'use client'
import {Metadata} from 'next';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {ScrollArea} from "@/components/ui/scroll-area";

import {
	Timeline,
	TimelineItem,
	TimelineConnector,
	TimelineHeader,
	TimelineTitle,
	TimelineIcon,
	TimelineDescription,
	TimelineContent,
	TimelineTime,
} from "@/components/timeline";
import Image from "next/image";
import {fetchData} from "next-auth/client/_utils";
import {findAll} from "@/app/timelineold/actions";
import {useSession} from "next-auth/react";
export const metadata: Metadata = {
	title: 'Timeline',
};

// @ts-ignore
const TimelinePage = ({}) => {
	const [data, setData] = useState([])

	const {data: session, status} = useSession()
	const fetchData = async () => {
		const d = status === 'authenticated' &&  await findAll(session?.user?.username) || []
		setData(d)
	}
	useEffect(() => {
		fetchData()
	}, []);
	// @ts-ignore
	const sortedData = data.length > -0 ? data.sort((b, a) => new Date(a.ngaycapnhat) - new Date(b.ngaycapnhat)) :[];

// @ts-ignore
	let previousDate = null;

	// Hiển thị các phần tử

// @ts-ignore
	const renderedData = sortedData.map((item, index) => {
		// Kiểm tra nếu ngày cập nhật hiện tại khác ngày cập nhật trước đó

// @ts-ignore
		if (item.ngaycapnhat !== previousDate) {
			// Lưu trữ ngày cập nhật hiện tại vào biến previousDate để sử dụng cho lần lặp tiếp theo
			previousDate = item.ngaycapnhat;

			// Trả về phần tử và ngày cập nhật
			return (
				<React.Fragment key={index}>
					<div className="ps-2 my-2 first:mt-0">
						<h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
							{item.ngaycapnhat}
						</h3>
					</div>
					<div className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
						{/* Nội dung phần tử */}
						<Link href={"/nhatky?id="+item.id}>

						<a className="absolute inset-0 z-[1]" href="#"></a>
						<div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700 dark:group-hover:after:bg-gray-600">
							<div className="relative z-10 size-7 flex justify-center items-center">
								<div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-gray-800 dark:border-gray-600"></div>
							</div>
						</div>
						<div className="grow p-2 pb-8 flex  justify-between gap-x-3">
							<div className="flex flex-col">
								<h3 className="font-semibold text-gray-800 dark:text-white">
									{item.tencongviec}
								</h3>
								<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
									{item.ghichu}
								</p>
								<button type="button" className="mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
									<img className="flex-shrink-0 h-4 w-4 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Image Description"/>
									{item.user}
								</button>
							</div>
							{item?.image && <img loading="lazy" alt={item?.id} style={{maxHeight: "120px", minWidth: "100px", objectFit: "cover" }} src={"/api/ftp/"+item?.image}/>}
							</div>
						</Link>
					</div>
				</React.Fragment>
			);
		} else {
			// Nếu ngày cập nhật hiện tại giống với ngày cập nhật trước đó, chỉ trả về nội dung của mục
			return (

				<div className="flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" key={index}>
					{/* Nội dung phần tử */}
					<Link href={"/nhatky?id="+item.id}>
					<a className="absolute inset-0 z-[1]" href="#"></a>
					<div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700 dark:group-hover:after:bg-gray-600">
						<div className="relative z-10 size-7 flex justify-center items-center">
							<div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-gray-800 dark:border-gray-600"></div>
						</div>
					</div>
					<div className="grow p-2 pb-8 flex justify-between  gap-x-3">
						<div className="flex flex-col">
							<h3 className="font-semibold text-gray-800 dark:text-white">
								{item.congviecObject?.tencongviec}
							</h3>
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
								{item.congviecObject?.chitietcongviec}
							</p>
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
								{item.ghichu}
							</p>
							<button type="button" className="mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
								<img className="flex-shrink-0 h-4 w-4 rounded-full" src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="Image Description"/>
								{item.user}
							</button>
						</div>
						{item?.image && <img loading="lazy" alt={item?.id} style={{maxHeight: "120px", minWidth: "100px", objectFit: "cover" }} src={"/api/ftp/"+item?.image}/>}
						</div>
					</Link>
				</div>
			);
		}
	});
	return (
		<div
			className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">
			<div className="grid gap-6 pt-5 grid-cols-1 md:pl-48 md:grid-cols-2">
				{/* profile */}

					<ScrollArea className="h-[600px] rounded-md w-full">
						<Timeline>
							{
			// @ts-ignore
								sortedData.map(item=>(
								<Link href={"/nhatky?id="+item.id}>
								<TimelineItem>
									<TimelineConnector />
									<TimelineHeader>
										<TimelineTime>{item.date}</TimelineTime>
										<TimelineIcon />
										<TimelineTitle>{item.tencongviec || item.congviecObject?.tencongviec}</TimelineTitle>
									</TimelineHeader>
									<TimelineContent>
										<TimelineDescription>{item.chitietcongviec}</TimelineDescription>
										<TimelineDescription>{item.ghichu}</TimelineDescription>
										{/*<Image src={'/xoai.png'} alt={'xoai'} width={300} height={200}/>*/}
									</TimelineContent>
								</TimelineItem>
								</Link>

							))
							}

						</Timeline>
					</ScrollArea>

				</div>

		</div>
	);
};

export default TimelinePage;
