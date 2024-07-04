'use client'
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {Label} from "recharts";
import {Input} from "@/components/ui/input";
import {Dialog} from "@radix-ui/react-dialog";
import {FloatingInput, FloatingLabel} from "@/components/ui/float-input";
import {useState} from "react";

export const AddNew = () => {
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
  return(
		<Dialog>
			<DialogTrigger>
		<Button className="h-9 gap-1">
		<PlusCircle className="h-3.5 w-3.5"/>
		<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
			Thêm mới
		</span>
	</Button>
	</DialogTrigger>
	<DialogContent style={{width: "80vw"}}>
		<DialogHeader>
			<DialogTitle>Tạo tài khoản</DialogTitle>
	<DialogDescription>
	</DialogDescription>
	</DialogHeader>
	<div className="grid gap-4 py-4">
		<div className="relative">
			<FloatingInput id="floating-customize" />
			<FloatingLabel htmlFor="floating-customize">Tài khoản</FloatingLabel>
		</div>
		<div className="relative">
			<FloatingInput id="floating-customize" />
			<FloatingLabel htmlFor="floating-customize">Mật khẩu</FloatingLabel>
		</div>
	</div>
	<DialogFooter>
	<Button type="submit">Save changes</Button>
	</DialogFooter>
	</DialogContent>
	</Dialog>
	)
}