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
  disabled,
  ...props
}: RootProps) {
  return (
    <div className="w-full space-y-1">
      <Select.Root {...props}>
        <Select.Trigger disabled={disabled} className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 truncate rounded border border-slate-200 p-2 text-xs outline-none enabled:focus-within:ring-2 enabled:focus-within:ring-slate-400 enabled:focus-within:ring-offset-2 enabled:hover:bg-primary/5 md:text-sm disabled:opacity-50 disabled:cursor-auto">
          <Select.Value placeholder={placeholder} className="truncate" />
          <Select.Icon>
            <BsChevronDown className="h-3 w-3" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            side="bottom"
            position="popper"
            sideOffset={8}
            className="z-10 w-[--radix-select-trigger-width] overflow-hidden truncate rounded-md border border-slate-200 bg-white shadow-sm h-auto max-h-[250px] overflow-y-auto"
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
