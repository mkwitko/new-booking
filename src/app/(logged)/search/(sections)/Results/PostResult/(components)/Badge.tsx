import { getAvailabilityProps } from '@/app/(logged)/search/(utils)/ShowingResultsUtils'
import React from 'react'

interface BadgeProps {
  availability: any
}

export default function Badge({ availability }: BadgeProps) {
  return (
    <p
      className={`${
        getAvailabilityProps(availability).color
      } w-[5.1rem] whitespace-nowrap rounded-2xl border p-[0.325rem] text-center text-[0.6rem] font-bold`}
    >
      {getAvailabilityProps(availability).text}
    </p>
  )
}
