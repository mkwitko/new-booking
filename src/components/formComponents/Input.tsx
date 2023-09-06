import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string | undefined;
  register?: UseFormRegisterReturn<string>;
  value?: any;
  setValue: (value: number) => void
}

export function Input({
  className,
  disabled = false,
  register,
  errorMessage = undefined,
  value,
  setValue,
  ...props
}: InputProps) {
  return (
    <div className="mt-auto w-full space-y-1">
      <div
        data-disabled={disabled}
        className={twMerge(
          "h-10 w-full rounded-md border border-slate-200 p-2 text-sm transition-colors  hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 data-[disabled=true]:cursor-auto data-[disabled=true]:opacity-50 data-[disabled=true]:hover:bg-white",
          className,
        )}
      >
        <input
          type="text"
          disabled={disabled}
          className="w-full border-none bg-transparent p-0 text-small text-textPrimary outline-none placeholder:text-sm placeholder:text-textPrimary focus:outline-none focus:ring-0"
          {...register}
          {...props}
          onChange={(e: any) => setValue(e.target.value)}
        />
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
