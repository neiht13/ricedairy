'use client'
import {Button} from "../../components/ui/button";
import {redirect, useRouter} from "next/navigation";
import {SaveAllIcon} from "lucide-react";
import Image from "next/image";

const Notfound = () => {
	const router = useRouter()
  return (
	  <div className="">
		  <div className="flex justify-center mt-10">
			<div
				className="bg-gradient-to-r text-2xl font-bold from-blue-500 via-teal-600 to-sky-500 bg-clip-text text-transparent">
				Trang không tồn tại</div>

			</div>
		  <div className="flex justify-center mt-10">
			  <Button onClick={()=>{
				  router.push("/")
			  }}
			          className="rounded-xl border border-primary bg-blue-600 px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-primary"
			  >
				  <SaveAllIcon className="mr-2 h-4 w-4" /> Quay về trang chủ
			  </Button>
		  </div>


		  <div className='flex justify-center h-full items-center' style={{height: '80vh'}}>
			  <Image src={'/vpt_logo.png'} height='100' width="100" alt={'logo'} className='animate-spin'/>
		  </div>
	  </div>
  )
}
export default Notfound