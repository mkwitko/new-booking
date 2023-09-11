"use client";

import {
  IAvailVipQuery,
  IRequestQuery,
} from "@/classes/availability/DTO/AvailabilityDTO";
import UseReservesHook from "@/hooks/reserves/UseReservesHook";
import UseDateHook from "@/hooks/search/date/UseDateHook";
import UseSalePointHook from "@/hooks/search/salePoint/UseSalePointHook";
import UseSolicitationsHook from "@/hooks/solicitations/UseSolicitationsHook";
import { format } from "date-fns";
import React from "react";

interface SolicitationsContextProps {
  salePointHook: any;
  dateHook: any;
  solicitationsHook: any;
  Search: () => void;
}

export const SolicitationsContext = React.createContext(
  {} as SolicitationsContextProps,
);

export function SolicitationsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const salePointHook = UseSalePointHook();

  const dateHook = UseDateHook();

  const solicitationsHook = UseSolicitationsHook();

  const bookingPolicyType = {
    "0": "ACCEPT",
    "1": "PENDING",
    "2": "DENIED",
  } as const;

  type BookingPolicyType = keyof typeof bookingPolicyType;

  const bookingDateType = {
    "0": "CHECKIN",
    "1": "CHECKOUT",
    "2": "ISSUANCE",
  } as const;

  type BookingDateType = keyof typeof bookingDateType;

  async function Search() {
    if (solicitationsHook.solicitationSelected === "0") {
      // faz request no /availability/vip
      let data: IAvailVipQuery | any = {};

      data = {
        query: {
          startDate: format(new Date(dateHook.checkIn), "yyyy-MM-dd"),
          endDate: format(new Date(dateHook.checkOut), "yyyy-MM-dd"),
        },
        companyId: salePointHook.salePoint,
      };
    } else {
      // faz request no /bookings/policies/find
      let data: IRequestQuery | any = {};

      if (solicitationsHook.locator) {
        data = { query: { bookingId: Number(solicitationsHook.locator) } };
      } else {
        data = {
          query: {
            startDate: format(new Date(dateHook.checkIn), "yyyy-MM-dd"),
            endDate: format(new Date(dateHook.checkOut), "yyyy-MM-dd"),
            bookingDateType:
              bookingDateType[solicitationsHook.dateType as BookingDateType],
          },
          companyId: salePointHook.salePoint,
        };

        if (solicitationsHook.bookingPolicyType) {
          data.query.bookingPolicyType =
            bookingPolicyType[
              solicitationsHook.bookingPolicyType as BookingPolicyType
            ];
        }
      }
    }

    // const response = availability.searchAvail(data);

    //   set(CACHE_PATH.AVAILABILITY.SEARCH_QUERY, {
    //     ...data,
    //     companyId: +salePointHook.salePoint,
    //     hotelCity,
    //   });

    //   return response;
  }

  return (
    <SolicitationsContext.Provider
      value={{
        salePointHook,
        dateHook,
        solicitationsHook,
        Search,
      }}
    >
      {children}
    </SolicitationsContext.Provider>
  );
}
