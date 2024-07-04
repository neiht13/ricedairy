"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import {Button, buttonVariants} from "@/components/ui/button"
import {usePathname} from "next/navigation";
import {signOut, useSession} from "next-auth/react";
import { UserNav } from "@/app/examples/dashboar/components/user-nav"
import * as React from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const {data: session} = useSession()
  const isAuth = (pathname === '/login');
  // @ts-ignore
  return (
    isAuth?<></>:
    <header className="top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
         <span
           className="bg-gradient-to-r font-bold from-blue-500 via-teal-600 to-sky-500 bg-clip-text text-transparent">
            {siteConfig.name}</span>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {/*<div className="w-full flex-1 md:w-auto md:flex-none">*/}
          {/*  <CommandMenu />*/}
          {/*</div>*/}
          <nav className="flex items-center align-middle  ">
            {session?.user?.email ? <UserNav/>:
            <Link
              href="/login"
              rel="noreferrer"
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Đăng nhập
              </Button>

            </Link>
            }
            {/*<ModeToggle />*/}
          </nav>
        </div>
      </div>
    </header>
  )
}
