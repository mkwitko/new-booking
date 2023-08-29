import { ComponentProps } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface TextareaProps extends ComponentProps<'textarea'> {
  errorMessage?: string | undefined
  register?: UseFormRegisterReturn<string>
}

export function Textarea({
  className,
  errorMessage = undefined,
  register,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full space-y-1">
      <textarea
        rows={5}
        className={twMerge(
          'w-full resize-none rounded border border-slate-200 p-2 text-xs transition-colors placeholder:text-xs focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 hover:bg-primary/5 md:text-sm md:placeholder:text-sm',
          className,
        )}
        {...register}
        {...props}
      />

      {errorMessage && (
        <p className="text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
