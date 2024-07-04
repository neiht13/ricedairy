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
import Timeline from "@/app/thongtinchung/muavu/components";
import GiaidoanPage from "@/app/thongtinchung/giaidoan/components";
import CongviecPage from "@/app/thongtinchung/congviec/components";

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
								Thông tin chung
							</h1>
							<Badge variant="outline" className="ml-auto sm:ml-0">
								Home
							</Badge>
						</div>
					</div>
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="all">Mùa vụ</TabsTrigger>
								<TabsTrigger value="active">Giai đoạn</TabsTrigger>
								<TabsTrigger value="draft">Công việc</TabsTrigger>
							</TabsList>
						</div>
						<TabsContent value="all">
							<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader>
									<CardTitle className='grid grid-cols-2'>Thông tin mùa vụ
										<div className="ml-auto flex items-center gap-2">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="outline" size="sm" className="h-7 gap-1">
														<ListFilter className="h-3.5 w-3.5"/>
														<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Filter by</DropdownMenuLabel>
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
											<Link href={"/thongtinchung/muavu/form"}>
												<Button className="h-9 gap-1">
													<PlusCircle className="h-3.5 w-3.5"/>
													<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Thêm mới
                  </span>
												</Button>
											</Link>
										</div></CardTitle>

								</CardHeader>
								<CardContent>
									<Timeline/>
								</CardContent>
								<CardFooter>

								</CardFooter>
							</Card>
						</TabsContent>
						<TabsContent value={"active"}>
							<Card className="sm:col-span-2">
								<CardHeader >
									<CardTitle  className='grid grid-cols-2'>Thông tin giai đoạn
										<div className="ml-auto flex items-center gap-2">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="outline" size="sm" className="h-7 gap-1">
														<ListFilter className="h-3.5 w-3.5"/>
														<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Filter by</DropdownMenuLabel>
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
											<Link href={"/thongtinchung/giaidoan/form"}>
												<Button className="h-9 gap-1">
													<PlusCircle className="h-3.5 w-3.5"/>
													<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Thêm mới
                  </span>
												</Button>
											</Link>
										</div>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<GiaidoanPage/>
								</CardContent>
								<CardFooter>

								</CardFooter>
						</Card>
						</TabsContent>
						<TabsContent value={"draft"}>
							<Card className="sm:col-span-2">
								<CardHeader>
									<CardTitle>Thông tin công việc</CardTitle>
								</CardHeader>
								<CardContent>
									<CongviecPage/>
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
