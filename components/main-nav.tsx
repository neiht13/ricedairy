"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <img  alt='' src='/apple-touch-icon.png' className="h-6 w-6"/>

        <span
          className="bg-gradient-to-r font-bold from-blue-500 via-teal-600 to-sky-500 bg-clip-text text-transparent">
            {siteConfig.name}</span>
      </Link>
      {/*<nav className="flex items-center gap-6 text-sm">*/}
      {/*  <Link*/}
      {/*    href="/nhatky"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname === "/docs" ? "text-foreground" : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Nhật ký*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href="/sanpham"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname === "/docs" ? "text-foreground" : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Sản phẩm*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href="/about"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname === "/docs" ? "text-foreground" : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Về chúng tôi*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href="/docs"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname === "/docs" ? "text-foreground" : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Docs*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href="/docs/components"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname?.startsWith("/docs/components")*/}
      {/*        ? "text-foreground"*/}
      {/*        : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Components*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href="/themes"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname?.startsWith("/themes")*/}
      {/*        ? "text-foreground"*/}
      {/*        : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Themes*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href="/examples"*/}
      {/*    className={cn(*/}
      {/*      "transition-colors hover:text-foreground/80",*/}
      {/*      pathname?.startsWith("/examples")*/}
      {/*        ? "text-foreground"*/}
      {/*        : "text-foreground/60"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    Examples*/}
      {/*  </Link>*/}
      {/*  <Link*/}
      {/*    href={siteConfig.links.github}*/}
      {/*    className={cn(*/}
      {/*      "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    GitHub*/}
      {/*  </Link>*/}
      {/*</nav>*/}
    </div>
  )
}
