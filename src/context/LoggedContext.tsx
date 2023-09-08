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

interface LoggedContextProps {
  user: UserClass;
  hotelChain: HotelsChainClass;
  locale: LocalesClass;
  availability: AvailabilityClass;
  customer: CustomerClass;
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
  }: {
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
        availability,
        customer,
        card,
      }}
    >
      {children}
    </LoggedContext.Provider>
  );
}
