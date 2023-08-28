export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-4 my-12 flex flex-col items-start justify-end
      md:mx-8 lg:mx-12
    xl:mx-16"
    >
      {children}
    </div>
  )
}
