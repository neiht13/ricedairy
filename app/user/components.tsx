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
import {findAll} from "./actions";
import {DemoGithub} from "./card";
import {Search} from "@/app/examples/dashboar/components/search";
import {Input} from "@/components/ui/input";
export const metadata: Metadata = {
	title: 'Timeline',
};

// @ts-ignore
const ListPage = ({}) => {

	const [dataRender, setDataRender] = useState([])
	const [data, setData] = useState([])
	// @ts-ignore
	const fetchData = async () => {
		const d= await findAll()
		setData(d)
		setDataRender(d)
	}
	useEffect(() => {
		fetchData()
	}, []);

	const [searchText, setSearchText] = useState("")

	useEffect(() => {
		const d = data.filter(item => item?.name.includes(searchText))
		setDataRender(d)
	}, [searchText]);

	// Hiển thị các phần tử
	return (
		<div
			className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">
			<div className="grid gap-6 pt-5 grid-cols-1 md:grid-cols-2">
				{/* profile */}
				<div className="mb-5">
					<div className='flex justify-end mr-4'>

						<Input
							type="search"
							value={searchText}
							onChange={e=>setSearchText(e.target.value)}
							placeholder="Tìm kiếm..."
							className="md:w-[100px] lg:w-[300px]"
						/>
					</div>
					<ScrollArea className="h-[600px] rounded-md space-y-4">
						<div className='space-y-4'>
							{
								dataRender.map(item=>(
									<DemoGithub data={item}/>
								))
							}
						</div>
					</ScrollArea>

				</div>

		</div>
		</div>
	);
};

export default ListPage;
