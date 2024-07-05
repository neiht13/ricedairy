import "@/styles/globals.css"
import {Metadata, Viewport} from "next"

import {siteConfig} from "@/config/site"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import {Analytics} from "@/components/analytics"
import {ThemeProvider} from "@/components/providers"
import {SiteFooter} from "@/components/site-footer"
import {SiteHeader} from "@/components/site-header"
import {TailwindIndicator} from "@/components/tailwind-indicator"
import {ThemeSwitcher} from "@/components/theme-switcher"
import {Toaster as DefaultToaster} from "@/registry/default/ui/toaster"
import {Toaster as NewYorkSonner} from "@/components/ui/sonner"
import {Toaster as NewYorkToaster} from "@/components/ui/toaster"
import SessionProvider from "@/hooks/provider"
import {AuthProvider} from "@/app/authContext";
import {
    Bird,
    Book,
    Bot,
    Code2, CornerDownLeft,
    LifeBuoy, Mic,
    Paperclip,
    Rabbit,
    Settings,
    Settings2,
    Share,
    Triangle,
    Turtle
} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Badge} from "@/components/ui/badge";
import Header from "@/app/Header";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: [
        "nhật ký canh tác",
    ],
    authors: [
        {
            name: "theinph",
            url: "",
        },
    ],
    creator: "v",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@thein",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <head/>
            <body
                className={cn(
                    "min-h-screen overflow-y-scroll font-sans antialiased",
                    fontSans
                )}

            >
                {/*<div className="relative overflow-hidden before:absolute before:top-0 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')]  before:bg-top before:size-full before:-z-[1] before:transform  dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">*/}

            <SessionProvider>
                <AuthProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div vaul-drawer-wrapper="">
                            <SiteHeader/>
                        <Header/>



                            <main style={{zIndex: 10}} className="flex-1">{children}</main>
                            {/*<SiteFooter />*/}
                    </div>
                    <ThemeSwitcher/>
                    <Analytics/>
                    <NewYorkToaster/>
                    <DefaultToaster/>
                    <NewYorkSonner/>
                </ThemeProvider>
                </AuthProvider>
            </SessionProvider>
            {/*</div>*/}
            </body>
            </html>
        </>
    )
}
