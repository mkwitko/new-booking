"use client";

import { useContext, useEffect, useState } from "react";
import { LoggedContext } from "@/context/LoggedContext";

export function useHotelDetails() {
  const { hotels } = useContext(LoggedContext);

  const [cardShowing, setCardShowing] = useState(true);
  const [activeThumbnail, setActiveThumbnail] = useState<string | null>(null);

  useEffect(() => {
    hotels.getHotelDetails();
  }, []);

  let hotelImages = hotels.hook.currentHotelDetails && [
    ...hotels.hook.currentHotelDetails.images.frontageImages,
  ];

  if (
    hotels.hook.currentHotelDetails &&
    hotels.hook.currentHotelDetails.images.infrastructureImages
  )
    hotelImages = [
      ...hotelImages,
      ...hotels.hook.currentHotelDetails.images.infrastructureImages,
    ];

  const hotelWebSite =
    hotels.hook.currentHotelDetails &&
    hotels.hook.currentHotelDetails.socialNetworks &&
    hotels.hook.currentHotelDetails.socialNetworks.filter((item: any) => {
      if (item.type === "SITE") return true;
    })[0];

  return {
    hotels,
    hotelImages,
    cardShowing,
    hotelWebSite,
    setCardShowing,
    activeThumbnail,
    setActiveThumbnail,
  };
}
