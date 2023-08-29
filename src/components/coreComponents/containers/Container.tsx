export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-8 my-12 flex flex-col items-start justify-end
      sm:mx-8 lg:mx-12
    xl:mx-16"
    >
      {children}
    </div>
  )
}
