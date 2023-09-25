import { useState } from "react";

export default function useBookingHook() {
  const [data, setData] = useState<any>([]);

  return {
    data,
    setData,
  };
}
