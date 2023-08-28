export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-start justify-end my-12 mx-4
      md:mx-8 lg:mx-12
    xl:mx-16"
    >
      {children}
    </div>
  )
}
