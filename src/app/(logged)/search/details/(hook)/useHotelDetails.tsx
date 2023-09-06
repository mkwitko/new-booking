'use client'

import { useContext, useEffect, useState } from "react";

import { useKeenSlider } from "./useKeenSlider";

import { SearchContext } from "@/context/SearchContext";

import { B2BApi } from "@/infra/api/B2BApi";

export function useHotelDetails() {
  const { sliderRef, thumbnailRef } = useKeenSlider()

  const [cardShowing, setCardShowing] = useState(true);
  const [hotelDetails, setHotelDetails] = useState<any | null>(null)
  const [activeThumbnail, setActiveThumbnail] = useState<string | null>(null);

  const currentHotel = JSON.parse(localStorage.getItem('current_hotel')!)

  const hotelImages = hotelDetails && [
    ...hotelDetails.images.frontageImages,
    ...hotelDetails.images.infrastructureImages,
  ]

  const { dateHook, roomsHook, peopleHook } = useContext(SearchContext);

  useEffect(() => {
    const searchedAlphaId = localStorage.getItem('currentAlphaId')
    B2BApi.get('hotels/' + searchedAlphaId).then(response => {
      return response.data
    }).then(response => setHotelDetails(response.data))
  }, [])

  const hotelWebSite = hotelDetails && hotelDetails.socialNetworks.filter((item: any) => {
    if (item.type === 'SITE') return true
  })[0]

  return {
    dateHook,
    roomsHook,
    sliderRef,
    peopleHook,
    hotelImages,
    cardShowing,
    thumbnailRef,
    hotelWebSite,
    hotelDetails,
    currentHotel,
    setCardShowing,
    activeThumbnail,
    setActiveThumbnail,
  }
}