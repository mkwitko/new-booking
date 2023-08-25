import { getAvailabilityProps } from '@/app/(logged)/search/(utils)/ShowingResultsUtils';
import React from 'react';

interface BadgeProps {
  availability: any;
}

export default function Badge({ availability }: BadgeProps) {
  return (
    <p
      className={`${
        getAvailabilityProps(availability).color
      } border rounded-2xl text-[0.6rem] font-bold p-[0.325rem] w-[5.1rem] text-center whitespace-nowrap`}
    >
      {getAvailabilityProps(availability).text}
    </p>
  );
}
