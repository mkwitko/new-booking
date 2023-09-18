"use client";

import {
  IAvailVipQuery,
  IAvailVipResponse,
  IRequestQuery,
} from "@/classes/availability/DTO/AvailabilityDTO";
import UseDateHook from "@/hooks/search/date/UseDateHook";
import UseSalePointHook from "@/hooks/search/salePoint/UseSalePointHook";
import UseSolicitationsHook from "@/hooks/solicitations/UseSolicitationsHook";
import { format } from "date-fns";
import React, { useContext } from "react";
import { LoggedContext } from "./LoggedContext";
import { data } from "autoprefixer";
import { CACHE_PATH } from "@/config/cache";
import { set } from "@/services/cache";

interface SolicitationsContextProps {
  salePointHook: any;
  dateHook: any;
  solicitationsHook: any;
  Search: () => Promise<IAvailVipResponse>;
}

export const SolicitationsContext = React.createContext(
  {} as SolicitationsContextProps,
);

export function SolicitationsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const { availability, booking } = useContext(LoggedContext);

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
    let response: IAvailVipResponse

    if (solicitationsHook.solicitationSelected === "0") {
      let data: IAvailVipQuery | any = {};

      data = {
        query: {
          startDate: format(new Date(dateHook.checkIn), "yyyy-MM-dd"),
          endDate: format(new Date(dateHook.checkOut), "yyyy-MM-dd"),
        },
        companyId: salePointHook.salePoint,
      };

      response = await availability.getAvailVip(data)

    } else {
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

      response = await booking.searchRequesties(data)

    }

    set(CACHE_PATH.SOLICITATION.SOLICITATION_QUERY, {
      ...data,
      companyId: +salePointHook.salePoint,
      solicitation: response,
    });

    return response;
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
