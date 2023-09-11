/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import UseDateHook from "@/hooks/search/date/UseDateHook";
import UseSalePointHook from "@/hooks/search/salePoint/UseSalePointHook";
import React from "react";
import UseCityHook from "@/hooks/search/city/UseCityHook";
import UseReservesHook from "@/hooks/reserves/UseReservesHook";
import { IQueryGetBookings } from "@/DTO/reserves/ReservesDTO";
import UseCustomersHook from "@/hooks/search/customer/UseCustomerHook";

interface ReservesContextProps {
  salePointHook: any;
  cityHook: any;
  dateHook: any;
  reservesHook: any;
  customerHook: any;
  Search: () => void;
}

export const ReservesContext = React.createContext({} as ReservesContextProps);

export function ReservesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const salePointHook = UseSalePointHook();

  const cityHook = UseCityHook();

  const dateHook = UseDateHook();

  const reservesHook = UseReservesHook();

  const customerHook = UseCustomersHook();

  const bookingStatus = {
    "0": "CONFIRMED",
    "1": "CANCELED",
    "2": "MODIFIED",
  } as const;

  type BookingStatusType = keyof typeof bookingStatus;

  const bookingDateType = {
    "0": "CHECKIN",
    "1": "CHECKOUT",
    "2": "CANCELED",
    "3": "ISSUANCE",
  } as const;

  type BookingDateType = keyof typeof bookingDateType;

  async function Search() {
    let data: IQueryGetBookings = {};

    if (reservesHook.locator) {
      data = { channelReservationNumber: reservesHook.locator };
    } else {
      data = {
        dateType: bookingDateType[reservesHook.dateType as BookingDateType],
        endDate: `${dateHook.checkOut.getFullYear()}-${dateHook.checkOut.getMonth()}-${dateHook.checkOut.getDay()}`,
        startDate: `${dateHook.checkIn.getFullYear()}-${dateHook.checkIn.getMonth()}-${dateHook.checkIn.getDay()}`,
      };

      if (salePointHook.salePoint) data.posCompanyIds = salePointHook.salePoint;

      if (reservesHook.statusSelected !== "ALL")
        data.status =
          bookingStatus[reservesHook.statusSelected as BookingStatusType];
    }

    // const response = availability.searchAvail(data);

    // set(CACHE_PATH.AVAILABILITY.SEARCH_QUERY, {
    //   ...data,
    //   companyId: +salePointHook.salePoint,
    //   hotelCity,
    // });

    // return response;
  }

  return (
    <ReservesContext.Provider
      value={{
        salePointHook,
        cityHook,
        dateHook,
        reservesHook,
        customerHook,
        Search,
      }}
    >
      {children}
    </ReservesContext.Provider>
  );
}
