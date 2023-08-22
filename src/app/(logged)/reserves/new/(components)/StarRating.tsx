import { FaStar } from 'react-icons/fa'

export function StarRating() {
  return (
    <div className="flex items-center justify-start gap-2 pb-1">
      <FaStar className="w-6 text-warning " />
      <FaStar className="w-6 text-warning " />
      <FaStar className="w-6 text-warning " />
      <FaStar className="w-6 text-zinc-300" />
      <FaStar className="w-6 text-zinc-300" />
      <FaStar className="w-6 text-zinc-300" />
    </div>
  )
}
