'use client'

import * as Select from '@radix-ui/react-select'
import { BsCheck } from 'react-icons/bs'

type ItemProps = Select.SelectItemProps & {
  text: string
}

export function Item({ text, ...props }: ItemProps) {
  return (
    <Select.Item
      className="flex h-10 w-full cursor-pointer items-center justify-between p-2 text-sm outline-none hover:bg-primary/5 data-[highlighted]:bg-slate-100 data-[highlighted]:hover:bg-slate-100"
      {...props}
    >
      <Select.ItemText className="text-sm">{text}</Select.ItemText>
      <Select.ItemIndicator>
        <BsCheck className="text-primary" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
