import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex items-center justify-center rounded-md bg-primary-400 px-4 py-2 font-semibold uppercase text-white transition-colors hover:bg-primary transition-colors',
  variants: {
    variant: {
      primary: 'bg-primary-400 text-white hover:bg-primary',
      warning: 'bg-warning text-white hover:bg-warningDark',
      ghost: 'text-textSecondary bg-transparent hover:bg-primary/5',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type Buttonprops = VariantProps<typeof buttonVariants> &
  ComponentProps<'button'>

export function Button({ className, variant, ...props }: Buttonprops) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  )
}
