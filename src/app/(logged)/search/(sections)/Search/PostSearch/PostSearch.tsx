import { CACHE_PATH } from '@/config/cache';
import CardDate from './components/CardDate';
import { get } from '@/services/cache';
import { useContext } from 'react';
import { SearchContext } from '@/context/SearchContext';

import { BiSolidBed } from 'react-icons/bi';
import { GiPerson } from 'react-icons/gi';
import { ImLocation } from 'react-icons/im';
import { BiFilter } from 'react-icons/bi';
import { availPayload } from '@/classes/availability/DTO/AvailabilityDTO';
import { localeCitiesData } from '@/classes/locales/DTO/LocaleDTO';

export default function PostSearch({
  setHasSearched,
}: {
  setHasSearched: any;
}) {
  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData;
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY);
  const { roomsHook, peopleHook, dateHook } = useContext(SearchContext);

  return (
    <div
      className="flex flex-col items-center gap-4 w-full
      xl:flex-row xl:justify-start
      xl:gap-8"
    >
      <div
        className="flex rounded-b2b border border-borderColor/20 w-full
        min-w-[6.5rem] xl:max-w-[8.5rem] mr-2 xl:mr-0"
      >
        <CardDate
          day={dateHook.checkInDay}
          month={dateHook.checkInMonth}
          weekDay={dateHook.checkInWeekDay}
          index="left"
        />
        <CardDate
          day={dateHook.checkOutDay}
          month={dateHook.checkOutMonth}
          weekDay={dateHook.checkOutWeekDay}
          index="right"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center gap-4 text-primary
      xl:flex-row xl:justify-start"
      >
        <div className="flex items-center gap-2">
          <BiSolidBed className="w-5 h-5" />
          <p>{roomsHook.textRoom}</p>
        </div>
        <div className="flex items-center gap-2">
          <GiPerson className="w-5 h-5" />
          <p>{peopleHook.textAdult}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <ImLocation className="w-5 h-5" />
          <p>{`${searchingQuery.hotelCity.cityName.toLowerCase()}, ${
            searchingQuery.hotelCity.stateSymbol
          }`}</p>
        </div>
      </div>
      <div className="hidden ml-auto xl:block">
        <Filter setHasSearched={setHasSearched} />
      </div>
    </div>
  );
}

const Filter = ({ setHasSearched }: any) => {
  return (
    <button
      type="button"
      onClick={() =>
        setHasSearched((prevState: boolean) => {
          return !prevState;
        })
      }
    >
      <span className="flex flex-row items-center">
        <p className="mr-1 text-textSecondary font-light">
          Clique para abrir o filtro
        </p>
        <BiFilter />
      </span>
    </button>
  );
};
