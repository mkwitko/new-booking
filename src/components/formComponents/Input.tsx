import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

export function Input({ className, disabled = false, ...props }: InputProps) {
  return (
    <div
      data-disabled={disabled}
      className={twMerge(
        'mt-auto h-10 w-full rounded border border-slate-200 p-2 transition-colors focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 enabled:hover:bg-primary/5 data-[disabled=true]:cursor-auto data-[disabled=true]:opacity-50',
        className,
      )}
    >
      <input
        type="text"
        disabled={disabled}
        className="w-full border-none bg-transparent p-0 outline-none placeholder:text-textPrimary focus:outline-none focus:ring-0"
        {...props}
      />
    </div>
  )
}
