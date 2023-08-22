import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { useState } from 'react'

export default function useHotelChainHook() {
  const [data, setData] = useState<any>(get(CACHE_PATH.HOTELCHAIN) || [])

  return {
    data,
    setData,
  }
}
