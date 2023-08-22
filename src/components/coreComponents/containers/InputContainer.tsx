import Label from '@/components/text/Label'

export default function InputContainer({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <Label title={label} />
      {children}
    </div>
  )
}
