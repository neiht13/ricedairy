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
import {Metadata} from "next";

export const metadata: Metadata = {
	title: 'Nhật ký canh tác',
};
export default function Dashboard() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="grid max-w-[59rem] flex-1 auto-rows-max gap-4">
						<div className="flex items-center gap-4">
							<Button variant="outline" size="icon" className="h-7 w-7">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Back</span>
							</Button>
							<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
								Nhật ký canh tác
							</h1>
							<Badge variant="outline" className="ml-auto sm:ml-0">
								Home
							</Badge>
						</div>
					</div>
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="all">Nhật ký</TabsTrigger>
								{/* <TabsTrigger value="active">Active</TabsTrigger>
								<TabsTrigger value="draft">Draft</TabsTrigger>
								<TabsTrigger value="archived" className="hidden sm:flex">
									Archived
								</TabsTrigger> */}
							</TabsList>
							<div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="h-7 gap-1">
											<ListFilter className="h-3.5 w-3.5"/>
											<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Lọc
                      </span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Lọc</DropdownMenuLabel>
										<DropdownMenuSeparator/>
										<DropdownMenuCheckboxItem checked>
											Active
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Archived
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button  variant="outline" className="h-9 gap-1">
									<File className="h-3.5 w-3.5"/>
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Xuất
                  </span>
								</Button>
								<Link href={"/nhatky"}>
								<Button className="h-9 gap-1">
									<PlusCircle className="h-3.5 w-3.5"/>
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Thêm
                  </span>
								</Button>
								</Link>
							</div>
						</div>
						<TabsContent value="all">
							<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader>
									<CardTitle>Nhật ký</CardTitle>
									<CardDescription>
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Timeline/>
								</CardContent>
								{/* <CardFooter>
									<div className="text-xs text-muted-foreground">
										Showing <strong>1-10</strong> of <strong>32</strong>{" "}
										products
									</div>
								</CardFooter> */}
							</Card>
						</TabsContent>
						{/* <TabsContent value={"active"}>
							<Card className="sm:col-span-2">
							<CardHeader className="pb-3">
								<CardTitle>Your Orders</CardTitle>
								<CardDescription className="max-w-lg text-balance leading-relaxed">
									Introducing Our Dynamic Orders Dashboard for Seamless Management and
									Insightful Analysis.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button>Create New Order</Button>
							</CardFooter>
						</Card>
						</TabsContent> */}
					</Tabs>
				</main>
			</div>
		</div>
	)
}
