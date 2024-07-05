"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {signIn} from "next-auth/react";
import {useState} from "react";
import {toast, useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [form, setForm] = useState({username: "", password:""})
  const router = useRouter()
    // @ts-ignore
  const onSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      const sg = await signIn('credentials', {
        username: form.username.toLowerCase(),
        password: form.password,
        redirect: false
      });

      if (sg?.ok) {
        setIsLoading(false)
        toast({
          title: "OK",
          description: "Đăng nhập thành công.",
        })
        router.push('/')
      }
      else {
        toast({
          title: "Error",
          description: "Đăng nhập thất bại.",
        })
        setIsLoading(false)
      }
    }
    const handleChange = (e: { target: { name: any; value: any } }) => {
      setForm({...form, [e.target.name]: e.target.value})
    }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-onl" htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-onl" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="name@example.com"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
            />
          </div>
          <Button
            className='border border-primary bg-blue-600 px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-primary'

            disabled={isLoading} type={"submit"}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Đăng nhập
          </Button>
        </div>
      </form>

    </div>
  )}
