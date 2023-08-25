import { Hotels } from '@/classes/availability/DTO/AvailabilityDTO';

export const findRateName = (hotel: Hotels, rateId: number) => {
  if (!hotel.rates) return '';
  const rate = hotel.rates.find(
    (each: any) => each.id.toString() === rateId.toString()
  );

  return rate ? rate.name : '';
};

export const findRate = (hotel: Hotels, roomIndex = 0, rateIndex = 0) => {
  return hotel.rates.find(
    (e: any) =>
      e.id === hotel.roomTypes[roomIndex].averageRates[rateIndex].rateId
  );
};
