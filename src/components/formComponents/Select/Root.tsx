'use client'

import { ReactNode } from 'react'

import { BsChevronDown } from 'react-icons/bs'
import * as Select from '@radix-ui/react-select'

interface RootProps extends Select.SelectProps {
  errorMessage?: string | undefined
  children: ReactNode
  placeholder: string
}

export function Root({
  children,
  placeholder,
  errorMessage = undefined,
  ...props
}: RootProps) {
  return (
    <div className="w-full space-y-1">
      <Select.Root {...props}>
        <Select.Trigger className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded border border-slate-200 p-2 text-sm outline-none focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 hover:bg-primary/5">
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <BsChevronDown className="h-3 w-3" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            side="bottom"
            position="popper"
            sideOffset={8}
            className="z-10 w-[--radix-select-trigger-width] overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm"
          >
            <Select.Viewport>{children}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {errorMessage && (
        <p className="text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
