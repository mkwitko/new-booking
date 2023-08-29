import { twMerge } from 'tailwind-merge'

export default function B2BTitle({
  title,
  classes,
}: {
  title: string
  classes?: string
}) {
  const defaultClasses =
    'text-primary font-[600] uppercase mb-4 self-center sm:self-start md:text-large md:mb-12'
  return (
    <h1 className={classes ? twMerge(defaultClasses, classes) : defaultClasses}>
      {title}
    </h1>
  )
}
