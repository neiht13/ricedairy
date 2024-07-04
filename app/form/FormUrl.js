'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ArrowUpRight, CornerDownLeft, RefreshCcwDotIcon, RefreshCcwIcon, SaveAllIcon} from "lucide-react";
import {useRef, useState} from "react";
import generateRandomString from "lib/generateRandomString";
import axios from "axios";
import {useSession} from "next-auth/react";
import dayjs from "dayjs";
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/components/ui/use-toast";
import {ReCAPTCHA} from "react-google-recaptcha";

const FormUrl = ({setReload}) => {
	const {data : session, status} = useSession()
	const { toast } = useToast()

	const [originalUrl, setOriginalUrl] = useState("")
	const [shortUrl, setShortUrl] = useState(generateRandomString(6))
	// const [captchaToken, setCaptchaToken] = useState('')
	const renewForm = () => {
		setOriginalUrl("")
		setShortUrl(generateRandomString(6))
	}
	const submitUrl = async (e) => {
		e.preventDefault()
			await axios.post('/api/link', {
				originalUrl,
				shortUrl,
				totalView: 0,
				userCreated: session?.user?.uId,
				dateCreated: dayjs(),
				lastView: dayjs()
			})
				.then(function (response) {
					setReload(r => !r)
					if (status === 'unauthenticated'){
						const currentLocal = JSON.parse(localStorage.getItem('links')) || []
						currentLocal.push({
							originalUrl,
							shortUrl,
							totalView: 0,
							dateCreated: dayjs(),
							lastView: dayjs()
						})
						localStorage.setItem('links', JSON.stringify(currentLocal))
					}
					setOriginalUrl("")
					setShortUrl(generateRandomString(6))
					toast({
						variant: "default",
						title: "Lưu thành công.",
						description: "There was a problem with your request.",
					})
				})
				.catch(function (error) {
					toast({
						variant: "destructive",
						title: "Short link đã được tạo, nhập lại short link khác.",
						description: "",
					})
				})



	}

	return (
	<form onSubmit={submitUrl} style={{width: "90%", marginLeft: "5%"}}>
		<div className="relative flex items-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={24}
				height={24}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				className="lucide lucide-link2 absolute left-2 my-3 ml-3 w-5 text-gray-400"
			>
				<path d="M9 17H7A5 5 0 0 1 7 7h2"/>
				<path d="M15 7h2a5 5 0 1 1 0 10h-2"/>
				<line x1={8} x2={16} y1={12} y2={12}/>
			</svg>
			<Input
				type="url"
				autoComplete="off"
				required
				style={{paddingLeft: "30px"}}
				className="shadow-md h-11 pl-56 bg-background"
				name="url"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
			/>
			<Button variant="outline" size="icon"
			        className="absolute h-9 right-1 my-1.5 mr-1.5 flex w-10 items-center justify-center"

			>
				<CornerDownLeft className="text-gray-500"/>

			</Button>
		</div>
		<br/>
		<div className="relative flex items-center">
                <span
					style={{width: "45%",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",}}
	                className="absolute left-2 my-3 mx-3 overflow-hidden text-gray-400 bg-gray-500  "
                >
                  https://link.vnptdongthap.com.vn/
                </span>
			<Input
				type="text"
				autoComplete="off"
				required
				style={{paddingLeft: "45%"}}
				className="shadow-md h-11 bg-background"
				// className="peer block w-full h-12 rounded-xl border border-gray-200 bg-white p-2 pr-12 shadow-lg focus:border-blue-500 focus:outline-none focus:ring-0"
				name="url"
				value={shortUrl}
				disabled={!originalUrl}
				onChange={(e) => setShortUrl(e.target.value)}
			/>

			<Button variant="outline" size="icon"
			        className="absolute h-9 right-1 my-1.5 mr-1.5 flex w-10 items-center justify-center"
				onClick={()=> setShortUrl(generateRandomString(6))}
			>
				<ArrowUpRight className="text-gray-500"/>
			</Button>
		</div>

		<div className="flex justify-center space-x-3 items-center h-full" style={{height: 70}}>
			<Button type='submit'
			        className="rounded-xl border border-primary bg-blue-600 px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-primary"
			>
				<SaveAllIcon className="mr-2 h-4 w-4" /> Tạo và Lưu
			</Button>
			<Button variant='secondary'
			        className="rounded-xl border border-primary px-5 py-2 text-sm text-primary shadow-lg transition-all"
			        onClick={renewForm}>
				<RefreshCcwIcon className="mr-2 h-4 w-4" /> Làm mới
			</Button>
		</div>

	</form>
	)

}
export default FormUrl;