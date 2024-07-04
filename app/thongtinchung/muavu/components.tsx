
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
import {findAllMuavu} from "@/app/thongtinchung/muavu/actions";
import {DemoGithub} from "@/app/thongtinchung/muavu/card";
import {
	DropdownMenu, DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ListFilter, PlusCircle} from "lucide-react";
export const metadata: Metadata = {
	title: 'Timeline',
};

// @ts-ignore
const TimelinePage = async ({}) => {
	// @ts-ignore

	const data = await findAllMuavu()

	const timelineData = [
		{
			id: 1,
			title: "First event",
			date: "2022-01-01",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.",
		},
		{
			id: 2,
			title: "Second event",
			date: "2022-02-01",
			description:
				"Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit libero distinctio. Ad dolorem tempora sit nostrum voluptatem qui tempora unde? Sit rerum magnam nam ipsam nesciunt aut rerum necessitatibus est quia esse non magni quae.",
		},
		{
			id: 3,
			title: "Third event",
			date: "2022-03-01",
			description:
				"Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae. Aut itaque incidunt est aperiam vero sit explicabo fuga id optio quis et molestiae nulla ex quae quam. Ab eius dolores ab tempora dolorum eos beatae soluta At ullam placeat est incidunt cumque.",
		},
	];
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

// @ts-ignore
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

export default TimelinePage;
