import { DialogFooter } from "@/components/ui/dialog";

export default function ModalFooter({children}: {
    children: React.ReactNode
}) {
  return (
    <DialogFooter>
        {children}
  </DialogFooter>

  )
}
