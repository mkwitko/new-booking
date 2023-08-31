import AmountBeforeTax from "@/app/(logged)/search/(components)/(finance)/AmountBeforeTax";
import RateName from "@/app/(logged)/search/(components)/(finance)/RateName";
import TotalTaxes from "@/app/(logged)/search/(components)/(finance)/TotalTaxes";
import MealPopover from "../(popovers)/MealPopover";
import ListPricing from "./ListPricing";
import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";

export default function Taxes({
  hotel,
  roomIndex,
  rateIndex,
  hasButtons = true,
}: {
  hotel: Hotels;
  roomIndex: number;
  rateIndex: number;
  hasButtons?: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-4 border-b pb-6 md:flex-row md:gap-0 md:border-b-0 md:pb-0">
      <div className="ml-0 flex w-full flex-row items-start justify-between gap-2 sm:flex-col md:ml-4 md:justify-start">
        <div>
          <RateName
            hotel={hotel}
            rateId={hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId}
            mergeClasses="text-primary text-[1rem] leading-4 font-[600] text-start mb-2"
          />
          <TotalTaxes room={hotel.roomTypes[roomIndex]} rateIndex={rateIndex} />
          <AmountBeforeTax
            room={hotel.roomTypes[roomIndex]}
            rateIndex={rateIndex}
          />
        </div>
        <MealPopover hotel={hotel} mealTitle />
      </div>
      <div className="flex w-full flex-row md:flex-col">
        <ListPricing
          hotel={hotel}
          roomIndex={roomIndex}
          rateIndex={rateIndex}
          hasButtons={hasButtons}
        />
      </div>
    </div>
  );
}
