import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/app/signup/components/user-auth-form"
// @ts-ignore
import prisma from "@/prisma/prisma";


export default async function AuthenticationPage() {


  return (
    <>
      <div className="container relative hidden  h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng ký
              </h1>
              <p className="text-sm text-muted-foreground">
                Sử dụng email để đăng ký
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Đã có tài khoản?{"  "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                Đăng nhập
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
