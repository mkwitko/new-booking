'use client'

import { CACHE_PATH } from '@/config/cache'
import { get } from '@/services/cache'
import { useState } from 'react'

export default function useUserHook() {
  //   get(CACHE_PATH.USER.AGENCIES_STORES).then((res) => {
  //     setData(res);
  //   });
  const [data, setData] = useState<any>([])

  return {
    data,
    setData,
  }
}
