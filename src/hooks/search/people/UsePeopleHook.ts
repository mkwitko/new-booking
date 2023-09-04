import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { useState } from 'react'

export default function UsePeopleHook() {
  //  People
  const [adult, setAdult] = useState<number>(1)
  const [child, setChild] = useState<number>(0)

  const textAdult = adult + (adult === 1 ? ' adulto' : ' adultos')
  const textChild = child + (child === 1 ? ' criança' : ' crianças')

  const cachedData = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY)
  
  const numberOfGuests = cachedData.adultGuestCount
  const companyId = cachedData.companyId

  return {
    adult,
    setAdult,
    child,
    setChild,
    textAdult,
    textChild,
    numberOfGuests,
    companyId,
  }
}
