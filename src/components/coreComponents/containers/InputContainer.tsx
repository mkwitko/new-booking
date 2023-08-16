'use client';

import Label from '@/components/text/Label';

export default function InputContainer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full">
      <Label title={label} />
      {children}
    </div>
  );
}
