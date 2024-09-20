import Image from "next/image"
import Link from "next/link"
import {
	ChevronLeft,
	File,
	Home,
	LineChart,
	ListFilter,
	MoreHorizontal,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2,
} from "lucide-react"

import {Badge} from "@/components/ui/badge"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import MusicPage from "@/app/examples/music/page";
import Timeline from "@/app/timelineold/page";
import ProfileForm from "./form";
import {findOneMuavu} from "../actions";


// @ts-ignore
export default async function Dashboard({searchParams}) {
	const id = searchParams.id;

	const nk =  id && await findOneMuavu(id)
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
						<div className="flex items-center gap-4">
							<Link href={"/thongtinchung"}>
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
							</Link>
							<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
								Thêm mới/ Sửa giai đoạn
							</h1>
							<Badge variant="outline" className="ml-auto sm:ml-0">
								Home
							</Badge>
						</div>
					</div>
					<Card>
						<CardHeader/>
						<CardContent>
						<ProfileForm data={nk}/>
						</CardContent>
						<CardFooter/>
					</Card>
				</main>
			</div>
		</div>
	)
}
