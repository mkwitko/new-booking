import { CACHE_PATH } from '@/config/cache';
import { get } from '@/services/cache';
import { useState } from 'react';

export default function useLocalesHook() {
  const [data, setData] = useState<any>([]);
  const [city, setCity] = useState<any>();

  return {
    data,
    setData,
  };
}
