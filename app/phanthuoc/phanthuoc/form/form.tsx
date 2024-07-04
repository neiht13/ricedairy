"use client"

import { useForm } from "react-hook-form"

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
import {FileUploader, FileUploaderContent, FileUploaderItem} from "@/components/ui/file-uploader";
import {FileInput} from "lucide-react";
import {createGiaidoan, findAll} from "./../actions";
import dayjs from "dayjs";
import {useSession} from "next-auth/react";


// @ts-ignore
const ProfileForm = ({data}) =>{
	console.log('data', data)
	const {data: session} = useSession()
	const form = useForm({
		defaultValues: data,
	})
	// const giaidoan = []
	const [giaidoan, setGiaidoan] = useState([])
	const [muavu, setMuavu] = useState([])

	// const muavua = await findAllMuavu();
	const [file, setFile] = useState()
	// 2. Define a submit handler.

// @ts-ignore
	function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		createGiaidoan({...values
		})
	}
	const dropzoneOptions = {
		url: '/upload', // URL where files will be uploaded
		maxFilesize: 5, // Maximum file size in megabytes
		acceptedFiles: 'image/*', // Specify accepted file types (e.g., images)
		addRemoveLinks: true, // Whether to add remove links for uploaded files
		dictDefaultMessage: 'Drop files here or click to upload', // Default message shown in the dropzone
		// Other options...
	};

	const [date, setDate] = useState()
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="tenphanthuoc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên phân thuốc</FormLabel>
							<FormControl>
								<Input  {...field} />
							</FormControl>
							<FormDescription>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				
				<FormField
					control={form.control}
					name="loai"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chọn loại </FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12">
										<SelectValue placeholder="Chọn loại..." />
									</SelectTrigger>
								</FormControl>
								<SelectContent>

									<SelectItem value={"Phân"}>Phân</SelectItem>
									<SelectItem value={"Thuốc"}>Thuốc</SelectItem>

								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Lưu</Button>
			</form>
		</Form>
	)
}
export default ProfileForm;