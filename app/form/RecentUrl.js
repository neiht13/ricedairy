'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
	ArrowUpRight,
	CircleOff,
	X,
	CornerDownLeft,
	DeleteIcon,
	HistoryIcon,
	LucideDelete,
	Paintbrush, RefreshCcwIcon
} from "lucide-react";
import React, {useEffect, useState} from "react";
import generateRandomString from "lib/generateRandomString";
import {
	Dialog,
	DialogContent,
	DialogDescription, DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import axios from "axios";
import dynamic from "next/dynamic";
import {toast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {useTheme} from "next-themes";
import {useConfig} from "@/hooks/use-config";
import {ThemeWrapper} from "@/components/theme-wrapper";
import {CheckIcon, InfoCircledIcon, MoonIcon, ResetIcon, SunIcon} from "@radix-ui/react-icons";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import {themes} from "@/registry/themes";
import {Skeleton} from "@/components/ui/skeleton";
import {QrModal} from "@/app/form/qrmodal";
import dayjs from "dayjs";
import {useSession} from "next-auth/react";
import {getAllLink} from "@/app/actions";

const RecentUrl = ({reload, setReload}) => {
	const [data, setData] = useState([])
	const {data: session, status} = useSession();

	useEffect(() => {
		fetchData()
	}, [reload, status]);
	const fetchData = async () => {
		const d = await getAllLink()
			if (d) {
				setData(d)
			} else {
					const currentLocal = JSON.parse(localStorage.getItem('links')) || [];
					const startIndex = Math.max(currentLocal.length - 5, 0);
					const lastFiveItems = currentLocal.slice(startIndex);
					const t = lastFiveItems.sort((a,b)=>dayjs(b.dateCreated)-dayjs(a.dateCreated))
					setData(t);
			}
	}

	const onDelete= async (record)=> {
		await axios.delete('/api/link?id='+record.id)
			.then(function (response) {
				setReload(p=> !p)
				toast({
					variant: "default",
					title: "Xóa thành công.",
				})
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	const RecentSkeleton =  () => {
		const length =  data?.length;
		const re = (5 - length) < 0 ? 0 : (5-length)
		const arr = Array.from({length: re})
		return(<>{
			arr.map(e=>(
					<li style={{opacity: 1, transform: "none"}}>
						<div
							style={{
								transform: "none",
								userSelect: "none",
								touchAction: "pan-y"
							}}
							className="relative flex cursor-grab items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg transition-[border-color] hover:border-blue-600 active:cursor-grabbing"
							draggable="true"
							tabIndex={0}
						>
							<div className="flex items-center space-x-4">
								<Skeleton className="h-9 w-9 rounded-xl"/>
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]"/>
									<Skeleton className="h-4 w-[200px]"/>
								</div>
							</div>
						</div>
					</li>
			))
		}
			</>
		)

	}

	return (
		<ul className="mt-3 space-y-2">
			<div className='flex space-x-3'>
				<HistoryIcon/> <span>Gần đây</span>

			</div>
			{data.sort((a, b) => a.dateCreated - b.dateCreated).slice(0, 5).map((record) => (
				<li style={{opacity: 1, transform: "none"}}>
					<div
						style={{
							transform: "none",
							userSelect: "none",
							touchAction: "pan-y"
						}}
						className="relative flex cursor-grab items-center justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-lg transition-[border-color] hover:border-blue-600 active:cursor-grabbing"
						draggable="true"
						tabIndex={0}
					>
						<div className="flex items-center space-x-3" style={{width: "50%"}}>
							<img
								alt="dub.co"
								loading="lazy"
								width={20}
								height={20}
								decoding="async"
								data-nimg={1}
								className="blur-0 pointer-events-none h-10 w-10 rounded-xl"
								style={{color: "transparent"}}
								src={"https://www.google.com/s2/favicons?sz=64&domain_url=" + record?.originalUrl}
							/>
							<div>
								<div className="flex items-center space-x-1 sm:space-x-2">
									<a
										className="hidden md:flex font-semibold text-sm truncate "
										href={record?.shortUrl}
										target="_blank"
										rel="noreferrer"
									>
										{'https://link.vnptdongthap.com.vn/'+record?.shortUrl}
									</a>
									<a
										className="md:hidden font-semibold truncate "
										href={record?.shortUrl}
										target="_blank"
										rel="noreferrer"
									>
										{'https://.../'+record?.shortUrl}
									</a>



								</div>
								<a
									href={record?.originalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="line-clamp-1 w-72 text-sm text-gray-500 underline-offset-2 transition-all hover:text-gray-800 hover:underline"
								>
									{record?.originalUrl}
								</a>
							</div>
						</div>
						<div className='flex items-center'>
							<button
								onClick={() => {
									navigator.clipboard.writeText('https://link.vnptdongthap.com.vn/'+record?.shortUrl)
									toast({
										title: "Đã sao chép vào Clipboard",
										description: 'https://link.vnptdongthap.com.vn/'+record?.shortUrl,
										action: (
											<ToastAction altText="Đã sao chép vào Clipboard">Đóng</ToastAction>
										),
									})
								}}
								className="group rounded-xl bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95">
								<span className="sr-only">Copy</span>
								<svg
									fill="none"
									shapeRendering="geometricPrecision"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									viewBox="0 0 24 24"
									width={14}
									height={14}
									className="text-gray-700 transition-all group-hover:text-blue-800"
								>
									<path
										d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"/>
								</svg>
							</button>
							{record && <QrModal record={record}/>}
							<Popover>
								<PopoverTrigger asChild data-side="top">
									<button
										className="group rounded-xl bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95">
										<svg
											fill="none"
											shapeRendering="geometricPrecision"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="1.5"
											viewBox="0 0 24 24"
											width={14}
											height={14}
											className="h-4 w-4"
										>
											<path d="M12 20V10"/>
											<path d="M18 20V4"/>
											<path d="M6 20v-4"/>
										</svg>
										<p className="text-sm">
										</p>
									</button>
								</PopoverTrigger>
								<PopoverContent className="w-52 flex items-center">
									Tổng truy cập: {record?.totalView}
								</PopoverContent>
							</Popover> <Popover>
							<PopoverTrigger asChild data-side="top">
								<button
									className="group border-blue-500 rounded-xl bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 hover:bg-blue-100 active:scale-95">

									<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
									     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
									     strokeLinejoin="round" className="lucide lucide-clock-4">
										<circle cx="12" cy="12"
										        r="10"/>
										<polyline
											points="12 6 12 12 16 14"/>
									</svg>

									<p className="text-sm">
									</p>
								</button>
							</PopoverTrigger>
							<PopoverContent className="w-52 flex items-center">
								Gần đây: {record?.lastView && dayjs(record?.lastView).format("hh:mm DD-MM-YYYY")}
							</PopoverContent>
						</Popover>
						<Popover>
							<PopoverTrigger>
								<Button variant="ghost" className='text-red-500'>
									<X  color="#ff0000" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-full h-10 flex items-center">
								 Xóa?&nbsp;&nbsp; <Button onClick={()=> onDelete(record)} variant="destructive" className="w-5 h-5"
								><span>OK</span>
							</Button>
							</PopoverContent>
						</Popover>
						</div>

					</div>
				</li>

			))}
			<RecentSkeleton/>
		</ul>

	)

}
export default RecentUrl;