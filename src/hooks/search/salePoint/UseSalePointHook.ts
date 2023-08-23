import { useState } from 'react';

export default function UseSalePointHook() {
  // Sale Point
  const [salePoint, setSalePoint] = useState<string>('');

  return {
    salePoint,
    setSalePoint,
  };
}
