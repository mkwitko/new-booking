import { PopoverTrigger } from '@/components/ui/popover';

export default function B2BPopoverTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PopoverTrigger asChild>{children}</PopoverTrigger>;
}
