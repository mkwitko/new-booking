import { Hotels, RoomType } from '@/classes/availability/DTO/AvailabilityDTO'
import { fCurrency } from '@/utils/FinanceUtil'
import { twMerge } from 'tailwind-merge'

interface TotalTaxesProps  {
  hotel?: Hotels
  room?: RoomType
  roomIndex?: number
  rateIndex?: number
  mergeClasses?: string
}

export default function TotalTaxes({
  hotel,
  room,
  roomIndex = 0,
  rateIndex = 0,
  mergeClasses,
}:TotalTaxesProps) {
  const classes = 'text-small text-textSecondary font-[400]'
  const condition = hotel
    ? hotel.roomTypes[roomIndex!].averageRates[rateIndex].totalTaxes
    : room!.averageRates[rateIndex].totalTaxes
  const text = fCurrency(condition)
  return (
    condition > 0 && (
      <p
        className={`${mergeClasses ? twMerge(classes, mergeClasses) : classes}`}
      >
        {text} em impostos e taxas
      </p>
    )
  )
}
