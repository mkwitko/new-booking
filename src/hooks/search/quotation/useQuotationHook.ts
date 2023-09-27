import { Hotels } from "@/classes/availability/DTO/AvailabilityDTO";
import { useState } from "react";

export default function UseQuotationHook() {
  const [quotation, setQuotation] = useState<any>([]);

  const findQuotation = (hotel: Hotels, roomIndex = 0, rateIndex = 0) => {
    return quotation.find(
      (e: any) =>
        e.rateId ===
        `${hotel.roomTypes[roomIndex].description}-${hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId}`,
    );
  };

  const handleAddQuotation = (hotel: Hotels, roomIndex = 0, rateIndex = 0) => {
    setQuotation((prev: any) => {
      const found = prev.filter((e: any, i: number) => {
        console.log(+e.rate.rateId);
        console.log(+hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId);
        return (
          +e.rate.rateId ===
          +hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId
        );
      });
      console.log("found - ", found);
      const index = prev.indexOf(found[0]);

      if (index > -1) {
        const newQuotation = [...prev];
        newQuotation.splice(index, 1);
        return newQuotation;
      }

      if (prev.length >= 5) return prev;

      const obj = {
        averageRates: hotel.roomTypes[roomIndex].averageRates[rateIndex],
        hotelName: hotel.name,
        availability: hotel.roomTypes[roomIndex].availability,
        rateId: `${hotel.roomTypes[roomIndex].description}-${hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId}`,
        hotelImg:
          `${process.env.NEXT_PUBLIC_HOTEL_IMAGES_URL}${hotel.logoImageURL}` ||
          "icons/withoutResult.svg",
        hotelAddress: hotel.location.address,
        occupancy: hotel.roomTypes[roomIndex].maxOccupancy,
        rate: hotel.roomTypes[roomIndex].averageRates[rateIndex],
        roomName: hotel.roomTypes[roomIndex].description,
      };

      const toAdd = prev ? [...prev, obj] : [obj];
      return toAdd;
    });
  };

  const handleRemoveQuotation = (rateId: string) => {
    setQuotation((prev: any) => {
      const found = prev.filter((e: any, i: number) => {
        return e.rateId === rateId;
      });
      const index = prev.indexOf(found[0]);

      if (index > -1) {
        const newQuotation = [...prev];
        newQuotation.splice(index, 1);
        return newQuotation;
      }
      return prev;
    });
  };

  const clearQuotation = () => {
    setQuotation([]);
  };

  return {
    quotation,
    setQuotation,
    handleRemoveQuotation,
    findQuotation,
    handleAddQuotation,
    clearQuotation,
  };
}
