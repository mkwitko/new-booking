export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-16 my-12 flex flex-col items-start justify-end">
      {children}
    </div>
  )
}
