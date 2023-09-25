import React from "react";

export default function CardDate({ month, day, weekDay, index }: any) {
  return (
    <div className="flex w-full flex-col items-center">
      <div
        className={`${
          index === "left" ? "rounded-tl-b2b" : "rounded-tr-b2b"
        } w-full bg-primary`}
      >
        <p className="text-center text-[0.75rem] text-textLight">{month}</p>
      </div>
      <div className="w-full pt-1 font-semibold">
        <p className="text-center text-primary">{day}</p>
      </div>
      <div className="text-[0.75rem] font-normal">{weekDay}</div>
    </div>
  );
}
