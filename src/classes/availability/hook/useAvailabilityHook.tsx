import { useContext, useState } from 'react'
import { IAvailVipPayload } from '../DTO/AvailabilityDTO';
import { LoggedContext } from '@/context/LoggedContext';
import { SearchContext } from '@/context/SearchContext';

export default function useAvailabilityHook() {
  
  const { availability } = useContext(LoggedContext);

  const { salePointHook } = useContext(SearchContext);

  const [data, setData] = useState<any>([])

  const [observation, setObservation] = useState<string>('');

  const [rooms, setRooms] = useState<number>(1);

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  function saveVip(roomTypeId: number) {
    const data: IAvailVipPayload = {
      roomTypeId: Number(roomTypeId),
      roomTypeQty: rooms,
      startDate: new Date(checkIn),
      endDate: new Date(checkOut),
      agencyObservation: observation,
      companyId: Number(salePointHook.salePoint),
    };

    availability.saveAvailVip(data)
  }

  return {
    data,
    setData,
    observation, 
    setObservation,
    rooms,
    setRooms,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    saveVip,
  }
}
