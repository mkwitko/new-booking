import { DialogContent } from "@/components/ui/dialog";

export default function ModalContent({
  children,
  mergeClasses = "",
}: {
  children: React.ReactNode;
  mergeClasses?: string;
}) {
  return <DialogContent className={mergeClasses}>{children}</DialogContent>;
}
