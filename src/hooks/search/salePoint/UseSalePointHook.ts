import { availPayload } from '@/classes/availability/DTO/AvailabilityDTO'
import { localeCitiesData } from '@/classes/locales/DTO/LocaleDTO'
import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { useState } from 'react'

export default function UseSalePointHook() {
  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY)
  // Sale Point
  const [salePoint, setSalePoint] = useState<string>(
    searchingQuery && searchingQuery.companyId
      ? searchingQuery.companyId?.toString()
      : '',
  )

  console.log(searchingQuery)

  return {
    salePoint,
    setSalePoint,
  }
}
