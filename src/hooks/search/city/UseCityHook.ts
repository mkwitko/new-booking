import { LoggedContext } from '@/context/LoggedContext';
import { useContext, useState } from 'react';

export default function UseCityHook() {
  const { locale } = useContext(LoggedContext);

  //   Destination
  const [city, setCity] = useState<string>('');

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
