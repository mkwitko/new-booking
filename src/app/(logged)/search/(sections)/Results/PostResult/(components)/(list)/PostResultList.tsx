import { Hotels, RoomType } from '@/classes/availability/DTO/AvailabilityDTO';
import Badge from '../Badge';
import CardsPopover from '../(popovers)/CardsPopover';
import PolicyPopover from '../(popovers)/PolicyPopover';
import MealPopover from '../(popovers)/MealPopover';
import ListPricing from './ListPricing';
import Rooms from './Rooms';
import { useState } from 'react';
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from 'react-icons/md';

export default function PostResultList({
  hotel,
  seeMore,
  setSeeMore,
  index,
}: {
  hotel: Hotels;
  seeMore: boolean[];
  setSeeMore: any;
  index: number;
}) {
  // States
  const [seeApartamentTaxes, setSeeApartamentTaxes] = useState(
    hotel.roomTypes.map(() => {
      return false;
    })
  );

  return (
    <div className="flex items-center w-full bg-white rounded-b2b p-4">
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between px-4 border-b pb-4">
          {/* Arrow And Hotel Name */}
          <div className="flex">
            <div className="flex flex-col w-full gap-4">
              <div>
                {/* <p className="font-bold uppercase text-textSecondary text-xs">
                {labelSystemIdentity(hotel.systemId)}
              </p> */}
                <p className="capitalize text-primary font-semibold">
                  {hotel.name.toLowerCase()}
                </p>
                <p className="text-extraSmall text-textSecondary text-[400]">{`${hotel.location.address.trim()}, ${hotel.location.neighborhood.trim()}`}</p>
                <p className="text-extraSmall font-[400] text-textSecondary">
                  {hotel &&
                    hotel.distanceFrom &&
                    `${hotel.distanceFrom.position.distance.toFixed(
                      2
                    )}km do centro`}
                </p>
              </div>
              <div className="flex flex-row items-start w-full my-2">
                {hotel.roomTypes[0].availability && (
                  <div className="flex gap-4 items-center">
                    <div className="flex gap-2 items-center">
                      <Badge availability={hotel.roomTypes[0].availability} />
                      <p className="text-normal text-textPrimary font-[300] capitalize">
                        {hotel.roomTypes[0].description.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 divide-x">
                      <div className="flex items-center pr-2">
                        <CardsPopover hotel={hotel} />
                      </div>
                      <div className="flex items-center px-2">
                        {' '}
                        <MealPopover
                          hotel={hotel}
                          mealTitle
                        />
                      </div>
                      <div className="flex items-center pl-2">
                        <PolicyPopover hotel={hotel} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Prices and Reservation Button */}
          {seeApartamentTaxes.findIndex((e: boolean) => e) === -1 && (
            <ListPricing hotel={hotel} />
          )}
        </div>
        {/* Room Type */}
        {seeMore[index] && (
          <div className="flex flex-col w-full items-center justify-between px-4 py-6 gap-6">
            {hotel.roomTypes
              .filter(
                (e: RoomType) => e.averageRates && e.averageRates.length > 0
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
              className="flex gap-2 items-center"
              type="button"
              onClick={() => {
                const newSeeMore = seeMore.map(() => {
                  return false;
                });
                newSeeMore[index] = !seeMore[index];
                if (!newSeeMore[index])
                  setSeeApartamentTaxes(newSeeMore.map(() => false));
                setSeeMore(newSeeMore);
              }}
            >
              <p className="text-primary text-small uppercase font-bold">
                {seeMore[index] ? 'Menos Tarifas' : 'Mais tarifas'}
              </p>
              {seeMore[index] ? (
                <MdOutlineKeyboardArrowUp className="w-4 h-auto text-primary" />
              ) : (
                <MdOutlineKeyboardArrowDown className="w-4 h-auto text-primary" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
