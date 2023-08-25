import { ComponentProps } from 'react'

interface CheckboxProps extends ComponentProps<'input'> {
  label: string
}

export function Checkbox({ label, id, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={id}
        {...props}
        className="h-5 w-5 cursor-pointer rounded border border-slate-500 font-light outline-none ring-0 checked:bg-primary-400 checked:hover:bg-primary focus:ring-0 focus:checked:bg-primary"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
