import Label from '@/components/text/Label';
import { twMerge } from 'tailwind-merge';

export default function InputContainer({
  label,
  children,
  mergeClass,
}: {
  label: string;
  children: React.ReactNode;
  mergeClass?: string;
}) {
    const defaultClasses = 'flex flex-col w-full';
    const classes = mergeClass ? twMerge(defaultClasses, mergeClass) : defaultClasses;
  return (
    <div className={classes}>
      <Label title={label} />
      {children}
    </div>
  );
}
