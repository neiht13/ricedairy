
import {Metadata} from 'next';
import Link from 'next/link';
import React from 'react';
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
export const metadata: Metadata = {
	title: 'Timeline',
};

// @ts-ignore
const CongviecPage = async ({}) => {
	// @ts-ignore

	const data = await findAll()

	let previousDate = null;

	// Hiển thị các phần tử
	return (
		<div
			className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">
			<div className="grid gap-6 pt-5 grid-cols-1 md:grid-cols-2">
				{/* profile */}
				<div className="mb-5">
					<ScrollArea className="h-[600px] rounded-md space-y-4">
						<div className='space-y-4'>
							{
								data.map(item=>(
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

export default CongviecPage;
