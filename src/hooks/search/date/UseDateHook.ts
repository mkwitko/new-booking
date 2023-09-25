import { availPayload } from "@/classes/availability/DTO/AvailabilityDTO";
import { localeCitiesData } from "@/classes/locales/DTO/LocaleDTO";
import { CACHE_PATH } from "@/config/cache";
import { get } from "@/services/cache";
import { isDateValid } from "@/utils/Dateutils";
import { addDays, format, isAfter } from "date-fns";
import { useState } from "react";

export default function UseDateHook() {
  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData;
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY);

  // Checkin and Checkout
  const checkoutDate = addDays(new Date(), 1);

  const [checkIn, setCheckIn] = useState<Date>(
    searchingQuery &&
      searchingQuery.checkinDate &&
      isDateValid(new Date(searchingQuery.checkinDate))
      ? new Date(searchingQuery.checkinDate)
      : new Date(),
  );
  const [checkOut, setCheckOut] = useState<Date>(
    searchingQuery &&
      searchingQuery.checkoutDate &&
      isDateValid(new Date(searchingQuery.checkoutDate)) &&
      isAfter(
        new Date(searchingQuery.checkoutDate).setHours(0, 0, 0, 0),
        isDateValid(new Date(searchingQuery.checkinDate))
          ? new Date(searchingQuery.checkinDate).setHours(0, 0, 0, 0)
          : new Date().setHours(0, 0, 0, 0),
      )
      ? new Date(searchingQuery.checkoutDate)
      : checkoutDate,
  );

  const checkInDay = format(new Date(checkIn), "dd");
  const checkInWeekDay = format(new Date(checkIn), "E");
  const checkInMonth = format(new Date(checkIn), "MMM");

  const checkOutDay = format(new Date(checkOut), "dd");
  const checkOutWeekDay = format(new Date(checkOut), "E");
  const checkOutMonth = format(new Date(checkOut), "MMM");

  return {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    checkInDay,
    checkInWeekDay,
    checkInMonth,
    checkOutDay,
    checkOutWeekDay,
    checkOutMonth,
  };
}
