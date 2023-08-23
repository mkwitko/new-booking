/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function PeopleInput({
  icon,
  value,
  set,
  min,
  max,
  label,
}: {
  icon: string;
  value: number;
  set: any;
  min?: number;
  max?: number;
  label: string;
}) {
  const minDisabled = min ? value <= min : value <= 0;
  const maxDisabled = max ? value >= max : false;
  return (
    <div className="flex gap-2 items-center">
      <img
        className="w-6 h-auto"
        src={icon}
        alt=""
      />
      <p className="w-full">{label}</p>
      <div className="w-full">
        <div className="flex items-center justify-between rounded-b2b border">
          <button
            onClick={() => {
              set(value - 1);
            }}
            disabled={minDisabled}
            className="w-full"
            type="button"
          >
            <p className={`${minDisabled ? 'opacity-50' : ''} text-[1.75rem]`}>
              -
            </p>
          </button>
          <p>{value}</p>
          <button
            onClick={() => {
              set(value + 1);
            }}
            disabled={maxDisabled}
            className="w-full"
            type="button"
          >
            <p className={`${maxDisabled ? 'opacity-50' : ''} text-[1.5rem]`}>
              +
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
