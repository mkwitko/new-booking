import { useState } from "react";

export default function useCardHook() {
  const [data, setData] = useState<any>([]);

  return {
    data,
    setData,
  };
}
