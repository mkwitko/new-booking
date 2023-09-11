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
        return (
          e.identifier ===
          hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId
        );
      });
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
        // checked: true,
        roomName: hotel.roomTypes[roomIndex].description,
      };

      /* 
 averageRates: rate[rateIndex],
          hotelName,
          roomName,
          availability,
          rateId: `${roomName}-${rate[rateIndex].rateId}`,
          hotelImg: `${hotelImagePath}${hotelImg}` || withoutResult,
          hotelAddress,
          occupancy,
      */
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
