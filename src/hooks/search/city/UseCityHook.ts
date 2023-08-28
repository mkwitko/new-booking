import { LoggedContext } from '@/context/LoggedContext';
import { useContext, useState } from 'react';
import { get } from '@/services/cache';
import { availPayload } from '@/classes/availability/DTO/AvailabilityDTO';
import { localeCitiesData } from '@/classes/locales/DTO/LocaleDTO';
import { CACHE_PATH } from '@/config/cache';

export default function UseCityHook() {
  const { locale } = useContext(LoggedContext);

  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData;
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY);

  //   Destination
  const [city, setCity] = useState<string>(
    searchingQuery && searchingQuery.hotelCityId ? searchingQuery.hotelCityId?.toString() : ''
  );

  const findCityById = (id: string | number) => {
    const cities = locale.hook.data;
    const city = cities.find(
      (city: any) => city.cityId.toString() === id.toString()
    );
    return city;
  };

  return {
    city,
    setCity,
    findCityById,
  };
}
