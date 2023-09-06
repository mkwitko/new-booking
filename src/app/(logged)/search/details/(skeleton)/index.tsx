export function HotelDetailsSkeleton() {
  return (
    <div className="w-full max-w-[964px] mx-auto flex items-start flex-col gap-4">
      <div className="w-full h-[370px] rounded-lg bg-zinc-300 animate-pulse"></div>

      <div className="w-full h-10 max-w-[600px] rounded-lg animate-pulse bg-zinc-300 mt-4"></div>
      <div className="w-full h-6 max-w-[600px] rounded-lg animate-pulse bg-zinc-300"></div>

      <div className="grid grid-cols-5 gap-4 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="w-full h-6 rounded-lg animate-pulse bg-zinc-300" key={index}></div>
        ))}
      </div>
    </div>
  )
}