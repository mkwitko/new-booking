import { useState } from "react";

export default function useLocalesHook() {
  const [data, setData] = useState<any>([]);

  return {
    data,
    setData,
  };
}
