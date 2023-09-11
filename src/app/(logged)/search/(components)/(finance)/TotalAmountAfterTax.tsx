import { Hotels, RoomType } from "@/classes/availability/DTO/AvailabilityDTO";
import { fCurrency } from "@/utils/FinanceUtil";
import { findRate } from "../../(utils)/Rates";

export default function TotalAmountAfterTax({
  hotel,
  room,
  roomIndex = 0,
  rateIndex = 0,
}: {
  hotel: Hotels;
  room?: RoomType;
  roomIndex?: number;
  rateIndex?: number;
}) {
  const comissioned = findRate(hotel, roomIndex, rateIndex)?.commissioned;
  const condition = hotel
    ? hotel.roomTypes[roomIndex].averageRates[rateIndex].totalAmountAfterTax
    : room!.averageRates[rateIndex].totalAmountAfterTax;
  const text: string = fCurrency(condition);
  return (
    condition > 0 && (
      <div className="flex items-center justify-center gap-2">
        <p className="text-end text-normal font-semibold text-primary">
          {text}
        </p>
        <div
          className={`${
            comissioned ? "bg-blue-300" : "bg-green-300"
          } flex h-5 w-5 items-center justify-center rounded-full`}
        >
          <p
            className={`${
              comissioned ? "text-blue-800" : "text-green-800"
            } text-small font-bold`}
          >
            {comissioned ? "C" : "N"}
          </p>
        </div>
      </div>
    )
  );
}
