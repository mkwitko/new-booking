import { Hotels, RoomType } from '@/classes/availability/DTO/AvailabilityDTO';
import { fCurrency } from '@/utils/FinanceUtil';

export default function TotalAmountAfterTax({
  hotel,
  room,
  roomIndex = 0,
  rateIndex = 0,
}: {
  hotel?: Hotels;
  room?: RoomType;
  roomIndex?: number;
  rateIndex?: number;
}) {
  const condition = hotel
    ? hotel.roomTypes[roomIndex].averageRates[rateIndex].totalAmountAfterTax
    : room!.averageRates[rateIndex].totalAmountAfterTax;
  const text: string = fCurrency(condition);
  return (
    condition > 0 && (
      <p className="text-primary text-normal font-semibold">{text}</p>
    )
  );
}
