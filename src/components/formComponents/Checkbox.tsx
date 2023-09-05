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
    <div className="flex items-center gap-2">
      <input
        onChange={onChange}
        checked={checked}
        type="checkbox"
        id={id}
        {...props}
        {...register}
        className="h-3 w-3 cursor-pointer rounded border border-slate-500 font-light outline-none ring-0 checked:bg-primary-400 checked:hover:bg-primary focus:ring-0 focus:checked:bg-primary "
      />

      {label && (
        <label htmlFor={id} className="text-small capitalize">
          {label.toLowerCase()}
        </label>
      )}
    </div>
  );
}
