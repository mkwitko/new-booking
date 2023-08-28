import { Hotels, RoomType } from '@/classes/availability/DTO/AvailabilityDTO'
import { findRateName } from '../../(utils)/Rates'
import { twMerge } from 'tailwind-merge'

export default function RateName({
  hotel,
  room,
  roomIndex = 0,
  rateIndex = 0,
  rateId,
  mergeClasses,
}: {
  hotel: Hotels
  room?: RoomType
  roomIndex?: number
  rateIndex?: number
  rateId?: number
  mergeClasses?: string
}) {
  const classes =
    'text-small text-end text-textSecondary font-normal capitalize'
  const text = findRateName(
    hotel,
    rateId ||
      (room
        ? room.averageRates[rateIndex].rateId
        : hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId),
  ).toLowerCase()
  return (
    <p className={`${mergeClasses ? twMerge(classes, mergeClasses) : classes}`}>
      {text.toLowerCase()}
    </p>
  )
}
