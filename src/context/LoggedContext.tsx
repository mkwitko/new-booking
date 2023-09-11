/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Classes from "@/classes";
import React, { useEffect } from "react";

import "@/config";
import HotelsChainClass from "@/classes/hotelsChain/HotelsChainClass";
import LocalesClass from "@/classes/locales/LocalesClass";
import UserClass from "@/classes/user/UserClass";
import AvailabilityClass from "@/classes/availability/AvailabilityClass";
import CustomerClass from "@/classes/customer/CustomerClass";
import CardClass from "@/classes/card/CardClass";
import BookingClass from "@/classes/booking/BookingClass";

interface LoggedContextProps {
  user: UserClass;
  hotelChain: HotelsChainClass;
  locale: LocalesClass;
  availability: AvailabilityClass;
  customer: CustomerClass;
  booking: BookingClass,
  card: CardClass;
}

export const LoggedContext = React.createContext({} as LoggedContextProps);

export function LoggedContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const classes: any = Classes();
  const {
    user,
    hotelChain,
    locale,
    availability,
    customer,
    card,
    booking,
  
  }: {
    booking: BookingClass,
    user: UserClass;
    hotelChain: HotelsChainClass;
    locale: LocalesClass;
    availability: AvailabilityClass;
    coreClass: any;
    customer: CustomerClass;
    card: CardClass;
  } = classes;

  useEffect(() => {
    hotelChain.getHotelChain();
    user.getAgenciesStores();
    locale.getLocales();
    customer.getCustomers();
    card.getCards();
  }, []);

  return (
    <LoggedContext.Provider
      value={{
        user,
        hotelChain,
        locale,
        booking,
        availability,
        customer,
        card,
      }}
    >
      {children}
    </LoggedContext.Provider>
  );
}
