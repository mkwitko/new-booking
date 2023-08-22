import { useState } from 'react'

export default function useSearchHook() {
  // Sale Point
  const [salePoint, setSalePoint] = useState<string>('')

  //   Destination
  const [city, setCity] = useState<string>('')

  // Checkin and Checkout
  const checkoutDate = new Date()
  checkoutDate.setDate(checkoutDate.getDate() + 1)
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(checkoutDate)

  //  People
  const [adult, setAdult] = useState<number>(1)
  const [child, setChild] = useState<number>(0)

  //   Rooms
  const [rooms, setRooms] = useState<number>(1)

  return {
    salePoint,
    setSalePoint,
    city,
    setCity,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    adult,
    setAdult,
    child,
    setChild,
    rooms,
    setRooms,
  }
}
