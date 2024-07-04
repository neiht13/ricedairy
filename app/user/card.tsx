import {
  ChevronDownIcon,
  CircleIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { Separator } from "@/components/ui/separator"
import IconMenuTodo from "@/assets/icon/menu/icon-menu-todo";
import Link from "next/link";

// @ts-ignore
export function DemoGithub({data}) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>
            {data.username}
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-xl bg-secondary text-secondary-foreground">
          <Link href={"/user/form?id="+data.id}>
          <Button variant="secondary" className=" shadow-none">
            <IconMenuTodo className="mr-2 h-4 w-4" />
            Sửa
          </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className="flex space-x-4 text-sm ">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {data.role[0]}
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
