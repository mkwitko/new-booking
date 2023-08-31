import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxProps extends ComponentProps<"input"> {
  label?: string;
  register?: UseFormRegisterReturn<string>;
  checked?: boolean;
  onChange?: () => void;
}

export function Checkbox({
  label,
  id,
  register,
  checked,
  onChange,
  className,
  ...props
}: CheckboxProps) {
  return (
    <div className={twMerge("flex items-center gap-2", className)}>
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id={id}
        {...props}
        {...register}
        className="h-4 w-4 cursor-pointer rounded border border-slate-500 font-light outline-none ring-0 checked:bg-primary-400 checked:hover:bg-primary focus:ring-0 focus:checked:bg-primary md:h-5 md:w-5"
      />

      {label && (
        <label htmlFor={id} className="text-xs md:text-sm">
          {label}
        </label>
      )}
    </div>
  );
}
