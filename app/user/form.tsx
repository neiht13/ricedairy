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


// @ts-ignore
export default function ProfileForm({data}) {
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

// @ts-ignore
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hộ canh tác</FormLabel>
							<FormControl>
								<Input {...field}/>
							</FormControl>
							<FormDescription>
								Tên hộ canh tác.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="masovungtrong"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mã số vùng trồng </FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số điện thoại </FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/*<FormField*/}
				{/*	control={form.control}*/}
				{/*	name="email"*/}
				{/*	render={({ field }) => (*/}
				{/*		<FormItem>*/}
				{/*			<FormLabel>Mùa vụ </FormLabel>*/}
				{/*			<Select onValueChange={field.onChange} defaultValue={field.value}>*/}
				{/*				<FormControl>*/}
				{/*					<SelectTrigger className="h-12">*/}
				{/*						<SelectValue placeholder="Chọn mùa vụ" />*/}
				{/*					</SelectTrigger>*/}
				{/*				</FormControl>*/}
				{/*				<SelectContent>*/}
				{/*					<SelectItem value="2023">2023</SelectItem>*/}
				{/*					<SelectItem value="2024">2024</SelectItem>*/}
				{/*					<SelectItem value="2025">2025</SelectItem>*/}
				{/*				</SelectContent>*/}
				{/*			</Select>*/}
				{/*			<FormMessage />*/}
				{/*		</FormItem>*/}
				{/*	)}*/}
				{/*/>*/}

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email </FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="dientich"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Diện tích canh tác (Ha) </FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="diachi"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Địa chỉ </FormLabel>
							<FormControl>
								<Input  {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/*<FormField*/}
				{/*	control={form.control}*/}
				{/*	name="date"*/}
				{/*	render={({ field }) => (*/}
				{/*		<FormItem>*/}
				{/*			<FormLabel>Ngày thực hiện </FormLabel>*/}
				{/*			<FormControl>*/}
				{/*				<DatePickerDemo date={date} setDate={setDate}/>*/}
				{/*			</FormControl>*/}
				{/*			<FormMessage />*/}
				{/*		</FormItem>*/}
				{/*	)}*/}
				{/*/>*/}

				<FormField
					control={form.control}
					name="mota"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mô tả</FormLabel>
							<FormControl>
								<Textarea  {...field} />
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