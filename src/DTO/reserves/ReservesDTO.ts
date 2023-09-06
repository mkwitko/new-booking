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