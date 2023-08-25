import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TextareaProps = ComponentProps<'textarea'>

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      rows={5}
      className={twMerge(
        'w-full resize-none rounded border border-slate-200 p-2 text-sm transition-colors placeholder:text-sm focus-within:ring-2 focus-within:ring-slate-400 focus-within:ring-offset-2 hover:bg-primary/5',
        className,
      )}
      {...props}
    />
  )
}
