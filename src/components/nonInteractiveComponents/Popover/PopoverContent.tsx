import { PopoverContent } from '@/components/ui/popover'

export default function B2BPopoverContent({
  children,
  align = 'start',
  classes,
}: {
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  classes?: string
}) {
  return (
    <PopoverContent align={align} className={classes}>
      {children}
    </PopoverContent>
  )
}
