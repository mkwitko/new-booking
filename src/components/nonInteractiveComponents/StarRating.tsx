import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { FaStar } from "react-icons/fa";

type StarRatingProps = ComponentProps<"div">;

export function StarRating({ className, ...props }: StarRatingProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-start gap-2 pb-1",
        className,
      )}
    >
      <FaStar className="w-4 text-warning md:w-6 " />
      <FaStar className="w-4 text-warning md:w-6 " />
      <FaStar className="w-4 text-warning md:w-6 " />
      <FaStar className="w-4 text-zinc-300 md:w-6" />
      <FaStar className="w-4 text-zinc-300 md:w-6" />
      <FaStar className="w-4 text-zinc-300 md:w-6" />
    </div>
  );
}
