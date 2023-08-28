'use client'

import * as Select from '@radix-ui/react-select'
import { BsCheck } from 'react-icons/bs'

type ItemProps = Select.SelectItemProps & {
  text: string
  creditCard?: boolean
  children?: React.ReactNode
}

export function Item({
  text,
  creditCard = false,
  children,
  ...props
}: ItemProps) {
  return (
    <Select.Item
      className="flex h-10 w-full cursor-pointer items-center justify-between p-2 text-sm outline-none hover:bg-primary/5 data-[highlighted]:bg-slate-100 data-[highlighted]:hover:bg-slate-100"
      {...props}
    >
      {creditCard ? (
        <Select.ItemText asChild>{children}</Select.ItemText>
      ) : (
        <Select.ItemText>{text}</Select.ItemText>
      )}

      <Select.ItemIndicator>
        <BsCheck className="text-primary" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
