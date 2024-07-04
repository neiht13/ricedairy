"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import DatePickerDemo from "@/app/nhatky/date-picker-demo";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import prisma from "@/prisma/prisma";
import {createNhatky} from "@/app/nhatky/actions";
import {useSession} from "next-auth/react";
import {findOneUser, updateUser} from "@/app/user/actions";


export default function PassWordForm({data}) {
	const {data: session} = useSession()
	const [user, setUser] = useState()
	const form = useForm()
	useEffect( () => {
		fetchData()
	}, []);
	const fetchData = async ()=>{
		const  id = await session?.user?.uId;
		const us = await findOneUser(id)
		console.log(us)
		console.log("ession?.user?.uId", session?.user?.uId)
		setUser(us)
		form.reset(us); // Reset form with defaultValues
	}


	// 2. Define a submit handler.
	function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('values',values)
		console.log('values',date)
		updateUser({...values})
	}

	const [date, setDate] = useState()
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu cũ</FormLabel>
							<FormControl>
								<Input type={"password"}{...field}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password1"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu mới</FormLabel>
							<FormControl>
								<Input type={"password"}{...field}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password2"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu mới</FormLabel>
							<FormControl>
								<Input type={"password"}{...field}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Lưu</Button>
			</form>
		</Form>
	)
}