import { ReactElement } from "react";
import { DefaultError } from "../DefaultError";

export type BookingStatus = 'CONFIRMED' | 'CANCELED' | 'MODIFIED';
export type BookingDateType = 'CHECKIN' | 'CHECKOUT' | 'CANCELED' | 'ISSUANCE';

export interface IQueryGetBookings {
  startDate?: string;
  endDate?: string;
  status?: BookingStatus;
  dateType?: BookingDateType;
  xCompany?: number;
  posCompanyIds?: string;
  channelReservationNumber?: number;
}

export interface IGetBookingResponse {
  timestamp: Date;
  data: IGetBookingListResponseData[];
  error?: DefaultError;
}

export interface IGetBookingListResponseData {
  startDate: string | any;
  endDate: string | any;
  roomType: {
    classification: string;
  };
  guests: GuestItem[];
  status: string;
  customer: {
    name: string;
    address: {
      location: {
        cityName: string;
      };
    };
  };
  channelReservationNumber: any | ReactElement;
  channel: string;
  property: {
    name: string;
  };
  cancellationLimit: string | any;
}

export interface GuestItem {
  name: string;
  surname: string;
  qualifyingAge: string;
}