"use client";

import {
  AverageRates,
  Hotels,
  IAvailResponse,
  RoomType,
} from "@/classes/availability/DTO/AvailabilityDTO";
import { FilterForm, Schema } from "./schema";
import { useContext, useEffect, useState } from "react";
import { CACHE_PATH } from "@/config/cache";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { get, set } from "@/services/cache";
import { LoggedContext } from "@/context/LoggedContext";

export function useFilterForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { availability } = useContext(LoggedContext);

  const filtering: FilterForm = get(CACHE_PATH.FILTER.FILTER);

  useEffect(() => {
    const searchingResult: IAvailResponse = get(CACHE_PATH.AVAILABILITY.HOTELS);
    setHotels(searchingResult.hotels);
  }, []);

  function filterHotels(data: FilterForm) {
    set(CACHE_PATH.FILTER.FILTER, data);
    const filteredHotels =
      hotels &&
      hotels.filter((hotel) => {
        if (
          data.name &&
          !hotel.name.toLowerCase().includes(data.name.toLowerCase())
        )
          return false;

        if (
          data.address &&
          !hotel.location.address
            .toLowerCase()
            .includes(data.address.toLowerCase()) &&
          !hotel.location.neighborhood
            .toLowerCase()
            .includes(data.address.toLowerCase()) &&
          !hotel.location.cityName
            .toLowerCase()
            .includes(data.address.toLowerCase()) &&
          !hotel.location.contryName
            .toLowerCase()
            .includes(data.address.toLowerCase()) &&
          !hotel.location.postalCode
            .toLowerCase()
            .includes(data.address.toLowerCase())
        )
          return false;

        if (data.onlyWithGateway && !hotel.systemId) return false;

        if (data.neighborhoods.some((e) => Object.values(e)[0] === true)) {
          const neighborhoods = data.neighborhoods
            .map((e) => {
              if (Object.values(e)[0] === true) return Object.keys(e)[0];
            })
            .filter((e) => e);

          if (!neighborhoods.includes(hotel.location.neighborhood))
            return false;
        }

        if (data.integratedSystems.some((e) => Object.values(e)[0] === true)) {
          const integratedSystems = data.integratedSystems
            .map((e) => {
              if (Object.values(e)[0] === true) return Object.keys(e)[0];
            })
            .filter((e) => e);

          if (!integratedSystems.includes(hotel.systemId)) return false;
        }

        if (
          data.withBreakfast &&
          !hotel.rates.some((rate) => rate.mealIncluded.code === "CM")
        )
          return false;

        if (data.priceRange!.min && data.priceRange!.max) {
          const rooms = hotel.roomTypes.filter((room) => {
            if (!room.averageRates) return;
            const rates = room.averageRates.filter((rate: AverageRates) => {
              if (
                +rate.totalAmountAfterTax > +data.priceRange!.min &&
                +rate.totalAmountAfterTax < +data.priceRange!.max
              )
                return rate;
            });
            if (rates.length > 0) return true;
          });
          if (rooms.length === 0) return false;
        }

        if (
          data.paymentMethods.billed &&
          !hotel.billings.some((billing) => billing.code === "faturado")
        )
          return false;

        if (
          data.paymentMethods.directPayment &&
          !hotel.billings.some((billing) => billing.code === "direto")
        )
          return false;

        if (
          data.paymentMethods.virtualCard &&
          !hotel.billings.some((billing) => billing.code === "cartaovi")
        )
          return false;

        if (data.onlyAvailable) {
          const roomsAvailable = hotel.roomTypes.filter((e: RoomType) => {
            return e.availability !== "NON";
          });
          if (roomsAvailable.length === 0) return false;

          hotel.roomTypes = roomsAvailable;
        }

        return true;
      });

    availability.hook.setData(filteredHotels);
    setOpen(false);
  }

  const [hotels, setHotels] = useState<Array<Hotels> | null>(null);

  let minPrice = 99999999999999;
  let maxPrice = 0;

  const setMinMaxPrice = () => {
    hotels &&
      hotels.forEach((hotel) => {
        hotel.roomTypes.forEach((room) => {
          if (!room.averageRates) return;
          room.averageRates.forEach((rate: AverageRates) => {
            if (rate.totalAmountAfterTax < minPrice)
              minPrice = +rate.totalAmountAfterTax.toFixed(2);
            if (rate.totalAmountAfterTax > maxPrice)
              maxPrice = +rate.totalAmountAfterTax.toFixed(2);
          });
        });
      });
  };

  setMinMaxPrice();

  const availNeighborhoods =
    hotels &&
    hotels
      .map((hotel) => hotel.location.neighborhood)
      .filter(
        (neighborhood, index, self) => self.indexOf(neighborhood) === index,
      );

  const integratedSystems =
    hotels &&
    hotels
      .map((hotel) => hotel.systemId)
      .filter((value, index, array) => array.indexOf(value) === index);

  const { register, handleSubmit, formState, watch, setValue } =
    useForm<FilterForm>({
      resolver: zodResolver(Schema),
      defaultValues: {
        name: filtering?.name || "",
        onlyWithGateway: filtering?.onlyWithGateway || false,
        priceRange: {
          min: filtering?.priceRange?.min || 0,
          max: filtering?.priceRange?.max || 0,
        },
        address: filtering?.address || "",
        withBreakfast: filtering?.withBreakfast || false,
        paymentMethods: {
          billed: filtering?.paymentMethods?.billed || false,
          directPayment: filtering?.paymentMethods?.directPayment || false,
          virtualCard: filtering?.paymentMethods?.virtualCard || false,
        },
        freeCancellation: filtering?.freeCancellation || false,
        onlyAvailable: filtering?.onlyAvailable || false,
        distanceRange: filtering?.distanceRange || 0,
        neighborhoods: filtering?.neighborhoods || false,
        integratedSystems: filtering?.integratedSystems || false,
      },
    });

  const resetNeighborhoods = () => {
    return availNeighborhoods!.map((item) => {
      return { [item]: false };
    });
  };

  const resetIntegratedSystems = () => {
    return integratedSystems!.map((item) => {
      return { [item]: false };
    });
  };

  function clearFilters() {
    setValue("name", "");
    setValue("onlyWithGateway", false);
    setValue("priceRange.min", minPrice);
    setValue("priceRange.max", maxPrice);
    setValue("address", "");
    setValue("withBreakfast", false);
    setValue("paymentMethods", {
      billed: false,
      directPayment: false,
      virtualCard: false,
    });
    setValue("freeCancellation", false),
      setValue("onlyAvailable", false),
      setValue("distanceRange", 0);
    setValue("neighborhoods", resetNeighborhoods());
    setValue("integratedSystems", resetIntegratedSystems());
  }

  return {
    hotels,
    setHotels,
    filterHotels,
    minPrice,
    maxPrice,
    availNeighborhoods,
    integratedSystems,
    register,
    clearFilters,
    handleSubmit,
    formState,
    watch,
    setValue,
  };
}
