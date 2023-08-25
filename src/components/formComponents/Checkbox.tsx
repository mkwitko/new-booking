import { ComponentProps } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CheckboxProps extends ComponentProps<'input'> {
  label: string
  register?: UseFormRegisterReturn<string>
}

export function Checkbox({ label, id, register, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        {...props}
        {...register}
        className="h-5 w-5 cursor-pointer rounded border border-slate-500 font-light outline-none ring-0 checked:bg-primary-400 checked:hover:bg-primary focus:ring-0 focus:checked:bg-primary"
      />

      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  )
}
