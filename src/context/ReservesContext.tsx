/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import UseDateHook from "@/hooks/search/date/UseDateHook";
import UseSalePointHook from "@/hooks/search/salePoint/UseSalePointHook";
import React, { useContext } from "react";
import UseCityHook from "@/hooks/search/city/UseCityHook";
import UseReservesHook from "@/hooks/reserves/UseReservesHook";
import { IGetBookingResponse, IQueryGetBookings } from "@/DTO/reserves/ReservesDTO";
import UseCustomersHook from "@/hooks/search/customer/UseCustomerHook";
import { LoggedContext } from "./LoggedContext";
import { format } from "date-fns";
import { set } from "@/services/cache";
import { CACHE_PATH } from "@/config/cache";

interface ReservesContextProps {
  salePointHook: any;
  cityHook: any;
  dateHook: any;
  reservesHook: any;
  customerHook: any;
  Search: () => Promise<IGetBookingResponse>;
}

export const ReservesContext = React.createContext({} as ReservesContextProps);

export function ReservesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { booking } = useContext(LoggedContext);

  const salePointHook = UseSalePointHook();

  const cityHook = UseCityHook();

  const dateHook = UseDateHook();

  const reservesHook = UseReservesHook();

  const customerHook = UseCustomersHook();

  const bookingStatus = {
    "0": "CONFIRMED",
    "1": "CANCELED",
    "2": "MODIFIED",
  } as const

  type BookingStatusType = keyof typeof bookingStatus

  const bookingDateType = {
    "0": "CHECKIN",
    "1": "CHECKOUT",
    "2": "CANCELED",
    "3": "ISSUANCE",
  } as const

  type BookingDateType = keyof typeof bookingDateType

  async function Search() {
    let data: IQueryGetBookings = {}

    if (reservesHook.locator) {
      data = { channelReservationNumber: reservesHook.locator }
    } else {
      data = {
        dateType: bookingDateType[reservesHook.dateType as BookingDateType],
        endDate: format(new Date(dateHook.checkOut), "yyyy-MM-dd"),
        startDate: format(new Date(dateHook.checkIn), "yyyy-MM-dd"),
      };

      if (salePointHook.salePoint)
        data.posCompanyIds = salePointHook.salePoint

      if (reservesHook.statusSelected !== 'ALL')
        data.status = bookingStatus[reservesHook.statusSelected as BookingStatusType]
    }

    const response = await booking.findBookings(data);

    set(CACHE_PATH.BOOKING.BOOKING_QUERY, {
      ...data,
      companyId: +salePointHook.salePoint,
      reserves: response,
    });

    reservesHook.setReserves(response)

    return response;
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
