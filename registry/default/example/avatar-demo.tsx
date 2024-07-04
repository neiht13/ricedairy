import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/thein.png" alt="@thein" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
