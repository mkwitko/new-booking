import { availPayload } from '@/classes/availability/DTO/AvailabilityDTO'
import { localeCitiesData } from '@/classes/locales/DTO/LocaleDTO'
import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { format } from 'date-fns'
import { useState } from 'react'

export default function UseDateHook() {
  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY)
  // Checkin and Checkout
  const checkoutDate = new Date()
  checkoutDate.setDate(checkoutDate.getDate() + 1)
  const [checkIn, setCheckIn] = useState<Date>(
    searchingQuery && searchingQuery.checkinDate
      ? new Date(searchingQuery.checkinDate)
      : new Date(),
  )
  const [checkOut, setCheckOut] = useState<Date>(
    searchingQuery && searchingQuery.checkoutDate
      ? new Date(searchingQuery.checkoutDate)
      : checkoutDate,
  )

  const checkInDay = format(new Date(checkIn), 'dd')
  const checkInWeekDay = format(new Date(checkIn), 'E')
  const checkInMonth = format(new Date(checkIn), 'MMM')

  const checkOutDay = format(new Date(checkOut), 'dd')
  const checkOutWeekDay = format(new Date(checkOut), 'E')
  const checkOutMonth = format(new Date(checkOut), 'MMM')

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
  }
}
