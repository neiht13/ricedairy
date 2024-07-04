"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FormDescription} from "@/components/ui/form";
import {useState} from "react";
import axios from "axios";
import dayjs from "dayjs";
import generateRandomString from "@/lib/generateRandomString";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
 const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    await axios.post('/api/signup', {
      email, password
    })
      .then(function (response) {
        toast({
          variant: "default",
          title: "Tạo thành công.",
        })
        router.push('login')
      })
      .catch(function (error) {
        toast({
          variant: "destructive",
          title: "Vui lòng sử dụng email khác.",
          description: "",
        })
      })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2 space-y-4">
          <div className="grid gap-1">
            <Label className="sr-onl" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="text"
              required
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-onl" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="name@example.com"
              type="password"
              required
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={e=>setPassword(e.target.value)}

            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-onl" htmlFor="password">
              Nhập lại password
            </Label>
            <Input
              id="password"
              placeholder="name@example.com"
              type="password"
              required
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={e=>setRepassword(e.target.value)}

            />
            {password !== repassword && <span className='text-red-500 text-xs'>
              Password nhập lại không khớp.
            </span>
            }
          </div>
          <Button disabled={password !== repassword} type={"submit"}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Đăng ký
          </Button>
        </div>
      </form>

    </div>
  )}
