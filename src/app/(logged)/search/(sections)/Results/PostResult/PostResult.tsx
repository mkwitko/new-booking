'use client';

import {
  Hotels,
  IAvailResponse,
} from '@/classes/availability/DTO/AvailabilityDTO';
import { CACHE_PATH } from '@/config/cache';
import { SearchContext } from '@/context/SearchContext';
import { get } from '@/services/cache';
import { differenceInDays } from 'date-fns';
import { useContext } from 'react';
import PostResultCard from './(components)/PostResultCard';

export default function PostResult() {
  const { dateHook, peopleHook } = useContext(SearchContext);

  const searchingResult: IAvailResponse = get(CACHE_PATH.AVAILABILITY.HOTELS);

  console.log(searchingResult);

  const subtitleText = () => {
    const days = differenceInDays(
      new Date(dateHook.checkOut),
      new Date(dateHook.checkIn)
    );

    const daysText = days === 1 ? '1 dia' : `${days} dias`;
    const peopleText = peopleHook.adult === 1 ? 'pessoa' : 'pessoas';

    return `${daysText}, ${peopleHook.adult + peopleHook.child} ${peopleText}`;
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
      </div>

      {true ? (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
          {searchingResult.hotels.map((hotel: Hotels, index: number) => {
            return (
              <PostResultCard
                hotel={hotel}
                key={hotel.hotelAlphaId}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
