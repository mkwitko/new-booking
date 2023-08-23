import { format } from 'date-fns';
import { useState } from 'react';

export default function UseDateHook() {
  // Checkin and Checkout
  const checkoutDate = new Date();
  checkoutDate.setDate(checkoutDate.getDate() + 1);
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(checkoutDate);

  const checkInDay = format(new Date(checkIn), 'dd');
  const checkInWeekDay = format(new Date(checkIn), 'E');
  const checkInMonth = format(new Date(checkIn), 'MMM');

  const checkOutDay = format(new Date(checkOut), 'dd');
  const checkOutWeekDay = format(new Date(checkOut), 'E');
  const checkOutMonth = format(new Date(checkOut), 'MMM');

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
