import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { useState } from 'react'

export default function useCustomerHook() {
  const [data, setData] = useState<any>([])

  return {
    data,
    setData,
  }
}
