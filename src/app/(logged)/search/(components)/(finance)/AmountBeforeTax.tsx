import { Hotels, RoomType } from '@/classes/availability/DTO/AvailabilityDTO';
import { fCurrency } from '@/utils/FinanceUtil';
import { twMerge } from 'tailwind-merge';

export default function AmountBeforeTax({
  hotel,
  room,
  roomIndex = 0,
  rateIndex = 0,
  mergeClasses,
}: {
  hotel?: Hotels;
  room?: RoomType;
  roomIndex?: number;
  rateIndex?: number;
  mergeClasses?: string;
}) {
  const classes = 'text-small text-textSecondary font-[400]';
  const condition = hotel
    ? hotel.roomTypes[roomIndex].averageRates[rateIndex].totalAmountAfterTax
    : room!.averageRates[rateIndex].totalAmountAfterTax;
  const text = fCurrency(condition);
  return (
    condition > 0 && (
      <p
        className={`${mergeClasses ? twMerge(classes, mergeClasses) : classes}`}
      >
        {text} por diária
      </p>
    )
  );
}
