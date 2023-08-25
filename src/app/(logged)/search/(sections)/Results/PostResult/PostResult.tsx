'use client';

import {
  Hotels,
  IAvailResponse,
} from '@/classes/availability/DTO/AvailabilityDTO';
import { CACHE_PATH } from '@/config/cache';
import { SearchContext } from '@/context/SearchContext';
import { get } from '@/services/cache';
import { differenceInDays, set } from 'date-fns';
import { useContext, useState } from 'react';
import Image from 'next/image';
import PostResultList from './(components)/(list)/PostResultList';
import PostResultCard from './(components)/(card)/PostResultCard';

export default function PostResult() {
  const { dateHook, peopleHook } = useContext(SearchContext);
  const [cardShowing, setCardShowing] = useState(false);

  const searchingResult: IAvailResponse = get(CACHE_PATH.AVAILABILITY.HOTELS);

  const [seeMore, setSeeMore] = useState(
    searchingResult.hotels.map(() => false)
  );

  const subtitleText = () => {
    const days = differenceInDays(
      new Date(dateHook.checkOut),
      new Date(dateHook.checkIn)
    );

    const daysText = days === 1 ? '1 dia' : `${days} dias`;
    const peopleText = peopleHook.adult === 1 ? 'pessoa' : 'pessoas';

    return `${daysText}, ${peopleHook.adult + peopleHook.child} ${peopleText}`;
  };

  const filtering = (e: Hotels) => {
    return (
      e.roomTypes &&
      e.roomTypes.length > 0 &&
      e.roomTypes[0].averageRates &&
      e.roomTypes[0].averageRates.length > 0
    );
  };

  const sortingByAvailability = (a: Hotels, b: Hotels) => {
    const availability: Array<{
      id: number;
      name: 'NON' | 'VIP' | 'PUB';
    }> = [
      {
        id: 1,
        name: 'PUB',
      },
      {
        id: 2,
        name: 'VIP',
      },
      {
        id: 3,
        name: 'NON',
      },
    ];
    const value1 = availability.find(
      (e) => e.name === a.roomTypes[0].availability
    );
    const value2 = availability.find(
      (e) => e.name === b.roomTypes[0].availability
    );
    return value1!.id < value2!.id ? -1 : value1!.id > value2!.id ? 1 : 0;
  };

  return (
    <div className="w-full">
      <div className="my-8 flex items-center justify-between">
        {/* Titulo Resultados */}
        <div className="flex gap-4 items-center">
          <p className="text-primary text-large font-[600]">
            {`${searchingResult.hotels.length} Resultados`}
          </p>
          <p className="text-textSecondary font-light">{subtitleText()}</p>
        </div>

        {/* Alterar visualização */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              //   rate.setSelectedRates([]);
              setCardShowing(!cardShowing);
            }}
            type="button"
          >
            <Image
              width={24}
              height={24}
              src={`/icons${!cardShowing ? '/viewList.svg' : '/viewCard.svg'}`}
              alt="Change between card and list view"
            />
          </button>
        </div>
      </div>

      <div
        className={`${
          !cardShowing
            ? 'grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12'
            : 'flex flex-col w-full gap-4 border-borderColor/20'
        }`}
      >
        {searchingResult.hotels
          .filter((e: Hotels) => {
            return filtering(e);
          })
          .sort((a: Hotels, b: Hotels) => {
            return sortingByAvailability(a, b);
          })
          .map((hotel: Hotels, index: number) => {
            return !cardShowing ? (
              <PostResultCard
                hotel={hotel}
                key={hotel.id}
              />
            ) : (
              <PostResultList
                hotel={hotel}
                key={hotel.id}
                seeMore={seeMore}
                setSeeMore={setSeeMore}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
}
