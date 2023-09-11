import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import { CACHE_PATH } from "@/config/cache";
import { get, set } from "@/services/cache";
import { useState } from "react";

export default function useHotelHook() {
  const [data, setData] = useState<any>([]);

  const [currentHotel, setCurrentHotel] = useState<Hotels | null>(
    get(CACHE_PATH.USER_INTERACTION.CURRENT_HOTEL) || null,
  );

  console.log("current hotel - ", currentHotel);

  const [currentApartamentIndex, setCurrentApartamentIndex] = useState<number>(
    +get(CACHE_PATH.USER_INTERACTION.CURRENT_APARTAMENT_INDEX) || 0,
  );

  const [currentRateIndex, setCurrentRateIndex] = useState<number>(
    +get(CACHE_PATH.USER_INTERACTION.CURRENT_RATE_INDEX) || 0,
  );

  const [currentHotelDetails, setCurrentHotelDetails] = useState<any>(null);

  const handleSetCurrentHotel = (
    hotel: Hotels,
    apartamentIndex = 0,
    rateIndex = 0,
  ) => {
    setCurrentHotel(hotel);
    setCurrentApartamentIndex(apartamentIndex);
    setCurrentRateIndex(rateIndex);
    setCurrentHotelDetails(null);
    set(
      CACHE_PATH.USER_INTERACTION.CURRENT_APARTAMENT_INDEX,
      apartamentIndex.toString(),
    );
    set(CACHE_PATH.USER_INTERACTION.CURRENT_RATE_INDEX, rateIndex.toString());
    set(CACHE_PATH.USER_INTERACTION.CURRENT_HOTEL, hotel);
    set(CACHE_PATH.HOTELS.CURRENT_HOTEL_DETAILS);
  };

  const resetCurrentHotel = () => {
    setCurrentHotel(null);
    setCurrentApartamentIndex(0);
    setCurrentRateIndex(0);
    setCurrentHotelDetails(null);
    set(CACHE_PATH.USER_INTERACTION.CURRENT_APARTAMENT_INDEX);
    set(CACHE_PATH.USER_INTERACTION.CURRENT_RATE_INDEX);
    set(CACHE_PATH.USER_INTERACTION.CURRENT_HOTEL);
    set(CACHE_PATH.HOTELS.CURRENT_HOTEL_DETAILS);
  };

  return {
    data,
    setData,
    currentHotel,
    setCurrentHotel,
    currentHotelDetails,
    setCurrentHotelDetails,
    currentApartamentIndex,
    setCurrentApartamentIndex,
    currentRateIndex,
    setCurrentRateIndex,
    handleSetCurrentHotel,
    resetCurrentHotel,
  };
}
