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
        "mx-auto px-8 max-w-[1264px] w-full my-12 flex flex-col items-start justify-end overflow-hidden",
        classes,
      )}
    >
      {children}
    </div>
  );
}
