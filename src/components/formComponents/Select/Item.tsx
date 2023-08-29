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
      className="flex h-10 w-full cursor-pointer items-center justify-between truncate p-2 text-xs outline-none hover:bg-primary/5 data-[highlighted]:bg-slate-100 data-[highlighted]:hover:bg-slate-100 md:text-sm"
      {...props}
    >
      {creditCard ? (
        <Select.ItemText className="truncate" asChild>
          {children}
        </Select.ItemText>
      ) : (
        <Select.ItemText className="truncate">{text}</Select.ItemText>
      )}

      <Select.ItemIndicator>
        <BsCheck className="text-primary" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
