import { Hotels, RoomType } from '@/classes/availability/DTO/AvailabilityDTO'
import Badge from '../Badge'
import CardsPopover from '../(popovers)/CardsPopover'
import PolicyPopover from '../(popovers)/PolicyPopover'
import MealPopover from '../(popovers)/MealPopover'
import ListPricing from './ListPricing'
import Rooms from './Rooms'
import { useState } from 'react'
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md'

export default function PostResultList({
  hotel,
  seeMore,
  setSeeMore,
  index,
}: {
  hotel: Hotels
  seeMore: boolean[]
  setSeeMore: any
  index: number
}) {
  // States
  const [seeApartamentTaxes, setSeeApartamentTaxes] = useState(
    hotel.roomTypes.map(() => {
      return false
    }),
  )

  return (
    <div className="flex w-full items-center rounded-b2b bg-white p-4">
      <div className="flex w-full flex-col">
        <div className="flex flex-col gap-4 md:flex-row md:gap-0 w-full items-center justify-between border-b px-4 pb-4">
          {/* Arrow And Hotel Name */}
          <div className="flex w-full flex-col gap-4 md:w-3/4">
              <div>
                {/* <p className="font-bold uppercase text-textSecondary text-xs">
                {labelSystemIdentity(hotel.systemId)}
              </p> */}
                <p className="font-semibold capitalize text-primary">
                  {hotel.name.toLowerCase()}
                </p>
                <p className="text-extraSmall text-[400] text-textSecondary">{`${hotel.location.address.trim()}, ${hotel.location.neighborhood.trim()}`}</p>
                <p className="text-extraSmall font-[400] text-textSecondary">
                  {hotel &&
                    hotel.distanceFrom &&
                    `${hotel.distanceFrom.position.distance.toFixed(
                      2,
                    )}km do centro`}
                </p>
              </div>
              <div className="my-2 flex w-full justify-center md:justify-start flex-row items-start">
                {hotel.roomTypes[0].availability && (
                  <div className="flex flex-col items-center gap-4 w-full justify-between sm:justify-start sm:flex-row">
                    <div className="flex items-center gap-2">
                      <Badge availability={hotel.roomTypes[0].availability} />
                      <p className="text-small md:text-normal font-[300] capitalize text-textPrimary">
                        {hotel.roomTypes[0].description.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center items-end md:items-center divide-x">
                      <div className="flex items-center pr-4 md:pr-2 ">
                        <CardsPopover hotel={hotel} />
                      </div>
                      <div className="flex items-center px-4 md:px-2">
                        <MealPopover hotel={hotel} mealTitle />
                      </div>
                      <div className="flex items-center pl-4 md:pl-2">
                        <PolicyPopover hotel={hotel} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          {/* Prices and Reservation Button */}
          {seeApartamentTaxes.findIndex((e: boolean) => e) === -1 && (
           <div className='w-full md:w-1/4'>
             <ListPricing hotel={hotel} />
           </div>
          )}
        </div>
        {/* Room Type */}
        {seeMore[index] && (
          <div className="flex w-full flex-col items-center justify-between gap-6 px-4 py-6">
            {hotel.roomTypes
              .filter(
                (e: RoomType) => e.averageRates && e.averageRates.length > 0,
              )
              .map((roomType: RoomType, index: number) => (
                <Rooms
                  hotel={hotel}
                  room={roomType}
                  key={roomType.id}
                  index={index}
                  seeApartamentTaxes={seeApartamentTaxes}
                  setSeeApartamentTaxes={setSeeApartamentTaxes}
                />
              ))}
          </div>
        )}
        {hotel && hotel.roomTypes && hotel.roomTypes.length > 0 && (
          <div className="flex w-full items-center justify-center pt-4">
            <button
              className="flex items-center gap-2"
              type="button"
              onClick={() => {
                const newSeeMore = seeMore.map(() => {
                  return false
                })
                newSeeMore[index] = !seeMore[index]
                if (!newSeeMore[index])
                  setSeeApartamentTaxes(newSeeMore.map(() => false))
                setSeeMore(newSeeMore)
              }}
            >
              <p className="text-small font-bold uppercase text-primary">
                {seeMore[index] ? 'Menos Tarifas' : 'Mais tarifas'}
              </p>
              {seeMore[index] ? (
                <MdOutlineKeyboardArrowUp className="h-auto w-4 text-primary" />
              ) : (
                <MdOutlineKeyboardArrowDown className="h-auto w-4 text-primary" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
