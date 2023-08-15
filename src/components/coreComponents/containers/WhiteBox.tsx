import { twMerge } from 'tailwind-merge';

export default function WhiteBox({
  children,
  classes,
}: {
  children: React.ReactNode;
  classes?: string;
}) {
  const defaultClasses =
    'flex flex-col items-start rounded-b2b border border-borderColor/20 bg-white w-full gap-8 lg:gap-10 relative p-6';
  return (
    <div
      className={classes ? twMerge(defaultClasses, classes) : defaultClasses}
    >
      {children}
    </div>
  );
}
