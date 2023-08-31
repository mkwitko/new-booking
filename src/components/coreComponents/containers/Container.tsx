import { twMerge } from "tailwind-merge";

export default function Container({
  children,
  classes = "",
}: {
  children: React.ReactNode;
  classes?: string;
}) {
  return (
    <div
      className={twMerge(
        "mx-8 my-12 flex flex-col items-start justify-end sm:mx-8 lg:mx-12 xl:mx-16",
        classes,
      )}
    >
      {children}
    </div>
  );
}
