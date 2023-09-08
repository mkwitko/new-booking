import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { useState } from 'react'

export default function useCardHook() {
  const [data, setData] = useState<any>([])

  return {
    data,
    setData,
  }
}
