import { get } from '@/services/cache';
import { useState } from 'react';

export default function useCoreHook() {
  const [data, setData] = useState<any>(null);

  return {
    data,
    setData,
  };
}
