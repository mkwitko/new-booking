import { Dialog } from "@/components/ui/dialog";

export default function Modal({ children }: { children: React.ReactNode }) {
  return <Dialog>{children}</Dialog>;
}
