import Link from "next/link"
import {ArrowRightIcon, QuestionMarkIcon} from "@radix-ui/react-icons"

import { Separator } from "@/components/ui/separator"

export function Announcement() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center rounded-xl bg-muted px-3 py-1 text-sm font-medium"
    >
      <QuestionMarkIcon/> <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span >Đăng nhập để lưu nhiều hơn.</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  )
}
