import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/app/login/components/user-auth-form"
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Nhật ký canh tác',
};

export default  function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        <div className="hidden relative bg-gradient-to-r from-blue-500 via-teal-600 to-sky-500 h-full flex-col bg-muted p-10 text-white md:flex dark:border-r">
          <div className=" sabsolute inset-0 bg-gradient-to-r from-blue-500 via-teal-600 to-sky-500 " />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng nhập
              </h1>
              <p className="text-sm text-muted-foreground">
                Sử dụng email đã đăng ký
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Chưa có tài khoản?{"  "}
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Đăng ký
              </Link>{" "}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
