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
// import {findAll} from "@/app/thongtinchung/giaidoan/actions";
// import {findAllCongviec, findAllMuavu} from "@/app/thongtinchung/muavu/actions";
import dayjs from "dayjs";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"


const ProfileForm = ({data}) =>{
	const {data: session, status} = useSession();

	const form = useForm({
		defaultValues: {...data, year: '2024'},
	})
	// const giaidoan = []
	const [giaidoan, setGiaidoan] = useState([])
	const [muavu, setMuavu] = useState([])
	const [congviecList, setCongviecList] = useState([])
	const [congviec, setCongviec] = useState([])
	const [giaidoanId, setGiaidoanId] = useState('')

	const fetchData = async () => {
		// const g = await findAll();
		// setGiaidoan(g)
		// const m = await findAllMuavu();
		// setMuavu(m)
		// const c = await findAllCongviec();
		// setCongviecList(c)
	}
	useEffect(() => {
		fetchData()
	}, []);
	useEffect(() => {
		const c = congviecList.filter(g=>g?.giaidoan === giaidoanId)
		setCongviec(c);
	}, [giaidoanId]);
	// const muavua = await findAllMuavu();
	const [file, setFile] = useState()
	const [tenBenh, setTenBenh] = useState("")
	const router = useRouter()	
	// 2. Define a submit handler.
	async function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log('values',values)
		console.log('values',date)
		const res = await createNhatky({...values, user: session?.user?.username, date: dayjs(date).format("DD/MM/YYYY"), soluong: parseInt(values.soluong), chiphi: parseInt(values.chiphi)
		})
		if (res) {
			toast({
			  title: "OK",
			  description: "Lưu thành công.",
			})
			router.push('/')
		  }
		  else {
			toast({
			  title: "Error",
			  description: "Lưu thất bại.",
			})
		  }
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

	const [date, setDate] = useState(new Date())
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

			<FormField
					control={form.control}
					name="year"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Chọn năm </FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12 text-lg">
										<SelectValue placeholder="Chọn năm" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
											<SelectItem value={'2023'}>{2023}</SelectItem>
											<SelectItem value={'2024'}>{2024}</SelectItem>
											<SelectItem value={'2025'}>{2025}</SelectItem>
							
								</SelectContent>
							</Select>
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
									<SelectTrigger className="h-12 text-lg">
										<SelectValue placeholder="Chọn mùa vụ" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										muavu.map(g=>(
											<SelectItem value={g.id}>{g.muavu}</SelectItem>
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
							<Select onValueChange={value=> {field.onChange(value), setGiaidoanId(value)}}  defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12 text-lg w-[80vw]">
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
					name="congviec"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Công việc </FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="h-12 text-lg">
										<SelectValue placeholder="Chọn công việc" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{
										congviec.map(g=>(
											<SelectItem value={g?.id}>{g?.tencongviec}</SelectItem>
										))
									}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

{/* 
				<FormField
					control={form.control}
					name="tencongviec"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên công việc</FormLabel>
							<FormControl>
								<Input  {...field} className="text-lg" />
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
								<Input  {...field} className="text-lg" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				 */}

				<FormField
					control={form.control}
					name="tenphan"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên phân </FormLabel>
							<FormControl>
								<Input {...field} className="text-lg" />
							</FormControl>
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
								<Input  {...field} className="text-lg" />
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
								<Input type={'number'} {...field} className="text-lg" />
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
									<SelectTrigger className="h-12 text-lg">
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
								<Input type='number'  {...field}  className="text-lg"/>
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
								<DatePickerDemo date={date} setDate={setDate} className="text-lg"/>
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
								<Textarea  {...field}  className="text-lg"/>
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
								<Input id="picture" type="file" onChange={uploadImage} className="text-lg" />
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