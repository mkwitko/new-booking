import { DialogTrigger } from "@/components/ui/dialog";

export default function ModalTrigger({children}: {
    children: React.ReactNode
}) {
  return (
    <DialogTrigger asChild>{children}</DialogTrigger>
  )
}
