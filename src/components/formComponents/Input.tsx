import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends ComponentProps<'input'> {
  errorMessage?: string | undefined
  register?: UseFormRegisterReturn<string>
}

export function Input({
  className,
  disabled = false,
  register,
  errorMessage = undefined,
  ...props
}: InputProps) {
  return (
    <div className="mt-auto w-full space-y-1">
      <div
        data-disabled={disabled}
        className={twMerge(
          'flex h-10 w-full items-center border border-slate-200 bg-white text-textPrimary rounded-md p-2 transition-colors focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 hover:bg-primary/5 data-[disabled=true]:cursor-auto data-[disabled=true]:opacity-50 data-[disabled=true]:hover:bg-white md:text-sm',
          className,
        )}
      >
        <input
          type="text"
          disabled={disabled}
          className="w-full border-none bg-transparent p-0 text-xs outline-none placeholder:text-xs placeholder:text-textPrimary focus:outline-none focus:ring-0 md:text-sm md:placeholder:text-sm"
          {...register}
          {...props}
        />
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
