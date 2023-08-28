import { twMerge } from 'tailwind-merge'

export default function B2BTitle({
  title,
  classes,
}: {
  title: string
  classes?: string
}) {
  const defaultClasses =
    'text-primary text-large font-[600] uppercase mb-12 self-center md:self-start'
  return (
    <h1 className={classes ? twMerge(defaultClasses, classes) : defaultClasses}>
      {title}
    </h1>
  )
}
