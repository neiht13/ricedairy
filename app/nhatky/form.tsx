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
import {FileUploader, FileUploaderContent, FileUploaderItem} from "@/components/ui/file-uploader";
import {FileInput} from "lucide-react";
import {findAll} from "@/app/thongtinchung/giaidoan/actions";
import {findAllMuavu} from "@/app/thongtinchung/muavu/actions";
import dayjs from "dayjs";


const ProfileForm = ({data}) =>{
	console.log('data', data)
	const form = useForm({
		defaultValues: data,
	})
	// const giaidoan = []
	const [giaidoan, setGiaidoan] = useState([])
	const [muavu, setMuavu] = useState([])
	const fetchData = async () => {
		const g = await findAll();
		setGiaidoan(g)
		const m = await findAllMuavu();
		setMuavu(m)
	}
	useEffect(() => {
		fetchData()
	}, []);
	// const muavua = await findAllMuavu();
	const [file, setFile] = useState()
	const [tenBenh, setTenBenh] = useState("")
	// 2. Define a submit handler.
	function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('values',values)
		console.log('values',date)
		createNhatky({...values, date: dayjs(date).format("DD/MM/YYYY"), chiphi: parseInt(values.chiphi)
		})
	}
	// @ts-ignore
	const uploadImage = async (e) => {
		const file = e.target.files[0];
		console.log(file)
		if (file) {
			try {
				const reader = new FileReader();
				reader.onloadend = async () => {
					const dataUrl = reader.result;
					const formData = new FormData();
					formData.append('image', file);
					const response = await fetch('http://localhost:3000/predict', {
						method: 'POST',
						body: formData
					});

					if (response.ok) {
						const data = await response.json();
						setTenBenh(data.label)

					} else {
						console.error('Failed to upload file.');
					}
				};
				reader.readAsDataURL(file);
			} catch (error) {
				console.error('Error handling file change:', error);
			}
		}

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
					name="tencongviec"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên công việc</FormLabel>
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
					name="chitietcongviec"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chi tiết công việc </FormLabel>
							<FormControl>
								<Input  {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="muavu"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chọn mùa vụ </FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12">
										<SelectValue placeholder="Chọn mùa vụ" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										muavu.map(g=>(
											<SelectItem value={g.id}>{g.nam + " - " + g.muavu}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="giaidoan"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Giai đoạn </FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12">
										<SelectValue placeholder="Chọn giai đoạn" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										giaidoan.map(g=>(
											<SelectItem value={g?.id} style={{color: g?.color}}>{g?.tengiaidoan + " - " + g?.ghichu}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tenthuoc"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên thuốc </FormLabel>
							<FormControl>
								<Input  {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="soluong"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Số lượng </FormLabel>
							<FormControl>
								<Input type={'number'} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dvt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Đơn vị tính </FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12">
										<SelectValue placeholder="Chọn Đơn vị" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>

											<SelectItem value={'ml/Ha'} >{'ml/Ha'}</SelectItem>
											<SelectItem value={'g/Ha'} >{'g/Ha'}</SelectItem>
											<SelectItem value={'lít /Ha'} >{'lít /Ha'}</SelectItem>
											<SelectItem value={'Kg/Ha'} >{'Kg/Ha'}</SelectItem>

								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="chiphi"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chi phí </FormLabel>
							<FormControl>
								<Input type='number'  {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ngày thực hiện </FormLabel>
							<FormControl>
								<DatePickerDemo date={date} setDate={setDate}/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="ghichu"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ghi chú </FormLabel>
							<FormControl>
								<Textarea  {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="picture">Hình ảnh</FormLabel>
							<FormControl>
								<Input id="picture" type="file" />
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
export default ProfileForm;