import {
  AverageRates,
  Hotels,
  RoomType,
} from '@/classes/availability/DTO/AvailabilityDTO'
import Badge from '../Badge'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'
import ListPricing from './ListPricing'
import AmountBeforeTax from '@/app/(logged)/search/(components)/(finance)/AmountBeforeTax'
import TotalTaxes from '@/app/(logged)/search/(components)/(finance)/TotalTaxes'
import RateName from '@/app/(logged)/search/(components)/(finance)/RateName'
import MealPopover from '../(popovers)/MealPopover'

export default function Rooms({
  hotel,
  room,
  seeApartamentTaxes,
  setSeeApartamentTaxes,
  index,
}: {
  hotel: Hotels
  room: RoomType
  seeApartamentTaxes: boolean[]
  setSeeApartamentTaxes: (arg0: boolean[]) => void
  index: number
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row w-full items-center justify-between">
        <div className="ml-4 flex gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center gap-2">
              <div className="ml-[-1.5rem]">
                <button
                  type="button"
                  onClick={() => {
                    const newSeeApartamentTaxes = seeApartamentTaxes.map(
                      () => false,
                    )
                    newSeeApartamentTaxes[index] = !newSeeApartamentTaxes[index]
                    setSeeApartamentTaxes(newSeeApartamentTaxes)
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
              <div className='ml-auto md:ml-0'>
              <Badge availability={room.availability} /></div>
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
            mergeClasses='justify-end'
          />
        )}
      </div>
      {seeApartamentTaxes[index] &&
        room.averageRates.map((e: AverageRates, i: number) => (
          <div key={e.rateId} className="border-b pb-6 flex flex-col gap-4 md:border-b-0 md:pb-0 md:flex-row md:gap-0 w-full">
            <div className="ml-0 flex flex-row items-start justify-between w-full sm:flex-col md:justify-start gap-2 md:ml-4">
              <div>
                <RateName
                  hotel={hotel}
                  rateId={e.rateId}
                  mergeClasses="text-primary text-[1rem] font-[600] text-start"
                />
                <TotalTaxes room={room} rateIndex={i} />
                <AmountBeforeTax room={room} rateIndex={i} />
              </div>
              <MealPopover hotel={hotel} mealTitle />
            </div>
            <div className="flex flex-row w-full md:flex-col">
              <ListPricing hotel={hotel} roomIndex={index} rateIndex={i} />
            </div>
          </div>
        ))}
    </div>
  )
}
