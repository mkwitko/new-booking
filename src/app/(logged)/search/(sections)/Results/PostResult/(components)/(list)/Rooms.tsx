import {
  AverageRates,
  Hotels,
  RoomType,
} from '@/classes/availability/DTO/AvailabilityDTO';
import Badge from '../Badge';
import { fCurrency } from '@/utils/FinanceUtil';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import ListPricing from './ListPricing';
import { findRateName } from '@/app/(logged)/search/(utils)/Rates';
import AmountBeforeTax from '@/app/(logged)/search/(components)/(finance)/AmountBeforeTax';
import TotalTaxes from '@/app/(logged)/search/(components)/(finance)/TotalTaxes';
import RateName from '@/app/(logged)/search/(components)/(finance)/RateName';
import MealPopover from '../(popovers)/MealPopover';

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
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-4 ml-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="ml-[-1.5rem]">
                <button
                  type="button"
                  onClick={() => {
                    const newSeeApartamentTaxes = seeApartamentTaxes.map(
                      () => false
                    );
                    newSeeApartamentTaxes[index] =
                      !newSeeApartamentTaxes[index];
                    setSeeApartamentTaxes(newSeeApartamentTaxes);
                  }}
                >
                  {seeApartamentTaxes[index] ? (
                    <MdOutlineKeyboardArrowUp className="w-4 h-auto text-primary" />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="w-4 h-auto text-primary" />
                  )}
                </button>
              </div>
              <p className="text-primary font-[600]">{room.description}</p>
              <Badge availability={room.availability} />
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
          />
        )}
      </div>
      {seeApartamentTaxes[index] &&
        room.averageRates.map((e: AverageRates, i: number) => (
          <div
            key={e.rateId}
            className="flex w-full"
          >
            <div className="flex flex-col justify-start w-full ml-4 gap-2">
              <div>
                <RateName
                  hotel={hotel}
                  rateId={e.rateId}
                  mergeClasses="text-primary text-[1rem] font-[600] text-start"
                />
                <TotalTaxes
                  room={room}
                  rateIndex={i}
                />
                <AmountBeforeTax
                  room={room}
                  rateIndex={i}
                />
              </div>
              <MealPopover
                hotel={hotel}
                mealTitle
              />
            </div>
            <div className="flex flex-col w-full">
              <ListPricing
                hotel={hotel}
                roomIndex={index}
                rateIndex={i}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
