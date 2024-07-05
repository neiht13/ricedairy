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
import Timeline from "@/app/timeline/page";
import ProfileForm from "@/app/user/form";
import {useSession} from "next-auth/react";
import {findOneUser} from "@/app/user/actions";
import {useEffect, useState} from "react";
import PassWordForm from "@/app/user/password";
import ListPage from "@/app/user/components";
import {Dialog} from "@radix-ui/react-dialog";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "recharts";
import {AddNew} from "@/app/user/add-new";

export default function Dashboard() {


	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="grid max-w-[59rem] flex-1 auto-rows-max gap-2">
						<div className="flex items-center gap-2">
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
							<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
								Thông tin người dùng
							</h1>
							<Badge variant="outline" className="ml-auto sm:ml-0">
								Home
							</Badge>
						</div>
					</div>
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="all">Thông tin</TabsTrigger>
								<TabsTrigger value="active">Đổi MK</TabsTrigger>
								{/* <TabsTrigger value="dsnd">DS người dùng</TabsTrigger> */}
							</TabsList>
							<div className="ml-auto flex items-center gap-2">

									<AddNew/>

							</div>
						</div>
						<TabsContent value="all">
							<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader/>

								<CardContent>
									<ProfileForm/>
								</CardContent>
								<CardFooter/>
							</Card>
						</TabsContent>
						<TabsContent value={"active"}>
							<Card className="sm:col-span-2">
							<CardHeader className="pb-3">
								<CardTitle>Đổi mật khẩu		 </CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
								</CardDescription>
							</CardHeader><CardContent>
								<PassWordForm/>
							</CardContent>
							<CardFooter>
							</CardFooter>
						</Card>
						</TabsContent>
						<TabsContent value={"dsnd"}>
							<Card className="sm:col-span-2">
							<CardHeader className="pb-3">
								<CardTitle>Danh sách người dùng		 </CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
								</CardDescription>
							</CardHeader><CardContent>
								<ListPage/>
							</CardContent>
							<CardFooter>
							</CardFooter>
						</Card>
						</TabsContent>
					</Tabs>
				</main>
			</div>
		</div>
	)
}
