/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Classes from "@/classes";
import React, { useEffect } from "react";

import "@/config";
import HotelsChainClass from "@/classes/hotelsChain/HotelsChainClass";
import LocalesClass from "@/classes/locales/LocalesClass";
import UserClass from "@/classes/user/UserClass";
import AvailabilityClass from "@/classes/availability/AvailabilityClass";

interface LoggedContextProps {
  user: UserClass;
  hotelChain: HotelsChainClass;
  locale: LocalesClass;
  availability: AvailabilityClass;
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
  }: {
    user: UserClass;
    hotelChain: HotelsChainClass;
    locale: LocalesClass;
    availability: AvailabilityClass;
    coreClass: any;
  } = classes;

  useEffect(() => {
    hotelChain.getHotelChain();
    user.getAgenciesStores();
    locale.getLocales();
  }, []);

  return (
    <LoggedContext.Provider
      value={{
        user,
        hotelChain,
        locale,
        availability,
      }}
    >
      {children}
    </LoggedContext.Provider>
  );
}
