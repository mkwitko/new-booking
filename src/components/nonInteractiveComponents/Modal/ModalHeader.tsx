import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ModalHeader({title, description}: {
   title?: string,
    description?: string
}) {
  return (
    <DialogHeader>
   {title && (
     <DialogTitle>{title}</DialogTitle>
   )}
   {description && (
     <DialogDescription>
   {description}
   </DialogDescription>
   )}
  </DialogHeader>
  )
}
