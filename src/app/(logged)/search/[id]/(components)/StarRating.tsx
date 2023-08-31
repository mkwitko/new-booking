import { FaStar } from 'react-icons/fa'

export function StarRating() {
  return (
    <div className="flex items-center justify-start gap-2 pb-1">
      <FaStar className="w-4 text-warning md:w-6 " />
      <FaStar className="w-4 text-warning md:w-6 " />
      <FaStar className="w-4 text-warning md:w-6 " />
      <FaStar className="w-4 text-zinc-300 md:w-6" />
      <FaStar className="w-4 text-zinc-300 md:w-6" />
      <FaStar className="w-4 text-zinc-300 md:w-6" />
    </div>
  )
}
