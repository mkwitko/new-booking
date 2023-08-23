/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import {
  IAvailResponse,
  availPayload,
} from '@/classes/availability/DTO/AvailabilityDTO';
import UseCityHook from '@/hooks/search/city/UseCityHook';
import UseDateHook from '@/hooks/search/date/UseDateHook';
import UsePeopleHook from '@/hooks/search/people/UsePeopleHook';
import UseRoomsHook from '@/hooks/search/rooms/UseRoomsHook';
import UseSalePointHook from '@/hooks/search/salePoint/UseSalePointHook';
import React, { useContext } from 'react';
import { LoggedContext } from './LoggedContext';
import { set } from '@/services/cache';
import { CACHE_PATH } from '@/config/cache';

interface SearchContextProps {
  salePointHook: any;
  cityHook: any;
  dateHook: any;
  peopleHook: any;
  roomsHook: any;
  Search: () => Promise<IAvailResponse>;
}

export const SearchContext = React.createContext({} as SearchContextProps);

/* 
Aqui vão todos os hooks e informações dinaâmicas que serão usadas na busca por disponibilidade de hotéis.
As informações são colocadas no Context pois não devem ser resetadas toda vez que forem chamadas.
*/
export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { availability } = useContext(LoggedContext);

  const salePointHook = UseSalePointHook();

  const cityHook = UseCityHook();

  const dateHook = UseDateHook();

  const peopleHook = UsePeopleHook();

  const roomsHook = UseRoomsHook();

  async function Search() {
    const data: availPayload = {
      checkinDate: dateHook.checkIn,
      checkoutDate: dateHook.checkOut,
      hotelCityId: +cityHook.city,
      enforceAvailability: false,
      adultGuestCount: peopleHook.adult,
      roomsQuantity: roomsHook.rooms,
      companyId: +salePointHook.salePoint,
    };

    const hotelCity = cityHook.findCityById(cityHook.city);

    const response = availability.searchAvail(data);

    set(CACHE_PATH.AVAILABILITY.SEARCH_QUERY, {
      ...data,
      hotelCity,
    });

    return response;
  }

  return (
    <SearchContext.Provider
      value={{
        salePointHook,
        cityHook,
        dateHook,
        peopleHook,
        roomsHook,
        Search,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
