'use client'

import { Hotels, IAvailResponse } from "@/classes/availability/DTO/AvailabilityDTO"
import { FilterForm, Schema } from "./schema"
import { useEffect, useState } from "react"
import { CACHE_PATH } from "@/config/cache"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { get } from "@/services/cache"

export function useFilterForm() {

  function filterHotels(data: FilterForm) {
    const filteredHotels = hotels && hotels.filter(hotel => {
      // Name - OK
      // if (data.name) {
      //   if (!hotel.name.toLowerCase().includes(data.name.toLowerCase())) return false
      //   return true
      // }

      // ADDRESS - OK
      // if (data.address) {
      //   if (!hotel.location.address.toLowerCase().includes(data.address.toLowerCase())) return false
      //   return true
      // }

      // NEIGHBORHOOK - OK
      // if (data.neighborhoods.some(item => item && item)) {
      //   const selectedNeighborhoods = data.neighborhoods.map((item, index) => {
      //     if (Object.values(item)[index]) return Object.keys(item)[index]
      //   })

      //   if (!selectedNeighborhoods.includes(hotel.location.neighborhood)) return false
      //   return true
      // }

    });

    console.log(filteredHotels)
  }

  const [hotels, setHotels] = useState<Array<Hotels> | null>(null)

  const priceRange = hotels && hotels.reduce((acc, hotel) => {
    const minPrice = hotel.roomTypes?.reduce((acc, room) => {
      const minPrice = room.averageRates?.reduce((acc, rate) => {
        if (rate.amountBeforeTax < acc) return rate.amountBeforeTax
        return acc
      }, Infinity)

      if (minPrice < acc) return minPrice
      return acc
    }, Infinity)

    const maxPrice = hotel.roomTypes?.reduce((acc, room) => {
      const maxPrice = room.averageRates?.reduce((acc, rate) => {
        if (rate.amountBeforeTax > acc) return rate.amountBeforeTax
        return acc
      }, 0)

      if (maxPrice > acc) return maxPrice
      return acc
    }, 0)

    if (minPrice < acc.minPrice) acc.minPrice = Math.floor(minPrice)
    if (maxPrice > acc.maxPrice) acc.maxPrice = Math.ceil(maxPrice)

    return acc
  }, { minPrice: Infinity, maxPrice: 0 })

  const availNeighborhoods = hotels && hotels.map(hotel => hotel.location.neighborhood)
    .filter((neighborhood, index, self) => self.indexOf(neighborhood) === index)

  const { register, handleSubmit, formState, watch, setValue } = useForm<FilterForm>({
    resolver: zodResolver(Schema),
  })

  const resetNeighborhoods = () => {
      return availNeighborhoods!.map(item => {
      return { [item]: false }
    })
  }

  function clearFilters() {
    setValue('name', '')
    setValue('onlyWithGateway', false)
    setValue('priceRange.min', priceRange?.minPrice)
    setValue('priceRange.max', priceRange?.maxPrice)
    setValue('address', '')
    setValue('paymentMethods', { billed: false, directPayment: false, virtualCard: false})
    setValue('freeCancellation', false),
    setValue('onlyAvailable', false),
    setValue('distanceRange', 0)
    setValue('neighborhoods', resetNeighborhoods())
  }

  useEffect(() => {
    const searchingResult: IAvailResponse = get(CACHE_PATH.AVAILABILITY.HOTELS)
    setHotels(searchingResult.hotels)
  }, [])

  return {
    hotels,
    setHotels,
    filterHotels,
    priceRange,
    availNeighborhoods,
    register,
    clearFilters,
    handleSubmit,
    formState,
    watch,
    setValue,
  }
}