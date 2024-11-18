"use client"

// @ts-ignore
import {
  CaretSortIcon,
  ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
  DotsHorizontalIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React, {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import {toast} from "@/components/ui/use-toast";
import {QrModal} from "@/app/form/qrmodal";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {X} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

// @ts-ignore
const columns = [
  {
    id: "select",
// @ts-ignore
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
// @ts-ignore
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "originalUrl",
    header: "Link gốc",
// @ts-ignore
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className=" w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">
              <a href={row.getValue("originalUrl")}>{row.getValue("originalUrl")}</a></div>

          </TooltipTrigger>
          <TooltipContent>
            <a href={row.getValue("originalUrl")}>{row.getValue("originalUrl")}</a>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "shortUrl",
// @ts-ignore
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Link rút gọn
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
// @ts-ignore
    cell: ({ row }) =>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
              <div className=" w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis"><a href={"https://link.vnptdongthap.com.vn/"+row.getValue("shortUrl")}>{"https://link.vnptdongthap.com.vn/"+row.getValue("shortUrl")}</a>
              </div>
          </TooltipTrigger>
          <TooltipContent>
              <a href={"https://link.vnptdongthap.com.vn/"+row.getValue("shortUrl")}>{"https://link.vnptdongthap.com.vn/"+row.getValue("shortUrl")}</a>
          </TooltipContent>
          </Tooltip>
      </TooltipProvider>
 ,
  },
  {
    accessorKey: "dateCreated",
// @ts-ignore
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày tạo
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
// @ts-ignore
    cell: ({ row }) => <div className=" w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">{row.getValue("dateCreated") && dayjs(row.getValue("dateCreated")).format('HH:mm DD-MM-YYYY')}</div>,
  },
  {
    accessorKey: "totalView",
// @ts-ignore
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượt truy cập
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
// @ts-ignore
    cell: ({ row }) => <div className=" w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">{row.getValue("totalView")}</div>,
  },
  {
    accessorKey: "lastView",
// @ts-ignore
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lần cuối truy cập
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
// @ts-ignore
    cell: ({ row }) => <div className=" w-[200px] overflow-hidden whitespace-nowrap overflow-ellipsis">{row.getValue("lastView") && dayjs(row.getValue("lastView")).format('HH:mm DD-MM-YYYY')}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
// @ts-ignore
    cell: ({row}) => (
      <div className='w-32 flex items-center'>

        <QrModal record={row.original}/>
        <Popover>
        <PopoverTrigger>
          <Button variant="ghost" className='text-red-500'>
            <X  color="#ff0000" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full h-10 flex items-center">
          Xóa?&nbsp;&nbsp; <Button onClick={()=> onDelete(row)} variant="destructive" className="w-5 h-5"
        ><span >OK</span>
        </Button>
        </PopoverContent>
      </Popover></div>
    )
  }
]

// @ts-ignore
const onDelete= async (record)=> {
  await axios.delete('/api/link?id='+record?.original?.id)
    .then(function (response) {
      toast({
        variant: "default",
        title: "Xóa thành công.",
      })
    })
    .catch(function (error) {
      console.log(error);
    })
}
// @ts-ignore
export function CardsDataTable({reload, setReload}) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [reload]);
  const fetchData = async () => {
    await axios.get('/api/link')
      .then(function (response) {
        setData(response?.data || []);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quản lý</CardTitle>
        <CardDescription>Các đường link đã tạo.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Tìm kiếm..."
            value={(table.getColumn("originalUrl")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("originalUrl")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Cột <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có dữ liệu.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} của {" "}
            {table.getFilteredRowModel().rows.length} hàng được chọn.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Số dòng trên trang</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Trang {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
