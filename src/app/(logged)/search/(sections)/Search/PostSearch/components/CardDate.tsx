import React from 'react';

export default function CardDate({ month, day, weekDay, index }: any) {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div
          className={`${
            index === 'left' ? 'rounded-tl-b2b' : 'rounded-tr-b2b'
          } bg-primary w-full`}
        >
          <p className="text-textLight text-center text-[0.75rem]">{month}</p>
        </div>
        <div className="w-full pt-1 font-semibold">
          <p className="text-primary text-center">{day}</p>
        </div>
        <div className="text-[0.75rem] font-normal">{weekDay}</div>
      </div>
    </>
  );
}
