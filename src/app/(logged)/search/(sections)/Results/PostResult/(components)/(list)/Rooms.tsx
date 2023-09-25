import {
  AverageRates,
  Hotels,
  RoomType,
} from "@/classes/availability/DTO/AvailabilityDTO";
import Badge from "../Badge";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import ListPricing from "./ListPricing";
import AmountBeforeTax from "@/app/(logged)/search/(components)/(finance)/AmountBeforeTax";
import TotalTaxes from "@/app/(logged)/search/(components)/(finance)/TotalTaxes";
import Taxes from "./Taxes";

export default function Rooms({
  hotel,
  room,
  seeApartamentTaxes,
  setSeeApartamentTaxes,
  index,
}: {
  hotel: Hotels;
  room: RoomType;
  seeApartamentTaxes: boolean[];
  setSeeApartamentTaxes: (arg0: boolean[]) => void;
  index: number;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
        <div className="ml-4 flex w-full gap-4">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="ml-[-1.5rem]">
                <button
                  type="button"
                  onClick={() => {
                    const newSeeApartamentTaxes = seeApartamentTaxes.map(
                      () => false,
                    );
                    newSeeApartamentTaxes[index] =
                      !newSeeApartamentTaxes[index];
                    setSeeApartamentTaxes(newSeeApartamentTaxes);
                  }}
                >
                  {seeApartamentTaxes[index] ? (
                    <MdOutlineKeyboardArrowUp className="h-auto w-4 text-primary" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="h-auto w-4 text-primary" />
                  )}
                </button>
              </div>
              <p className="font-[600] text-primary">{room.description}</p>
              <div className="ml-auto md:ml-0">
                <Badge availability={room.availability} />
              </div>
            </div>
            {!seeApartamentTaxes[index] && (
              <>
                <TotalTaxes room={room} />
                <AmountBeforeTax room={room} />
              </>
            )}
          </div>
        </div>
        {!seeApartamentTaxes[index] && (
          <ListPricing
            hotel={hotel}
            roomIndex={index}
            rateIndex={0}
            hasButtons={false}
            mergeClasses="justify-end"
          />
        )}
      </div>
      {seeApartamentTaxes[index] &&
        room.averageRates.map((e: AverageRates, i: number) => (
          <Taxes key={e.rateId} hotel={hotel} roomIndex={index} rateIndex={i} />
        ))}
    </div>
  );
}
