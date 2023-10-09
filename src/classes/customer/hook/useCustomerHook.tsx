import { useState } from "react";

export default function useCustomerHook() {
  const [data, setData] = useState<any>([]);
  const [bookingAttributes, setBookingAttributes] = useState<any>(null);
  const [costCenter, setCostCenter] = useState<any>(null);

  console.log('cost center from hook - ', costCenter);

  return {
    data,
    setData,
    bookingAttributes,
    setBookingAttributes,
    costCenter,
    setCostCenter,
  };
}
