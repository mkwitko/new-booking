import { CACHE_PATH } from '@/config/cache'
import CardDate from './components/CardDate'
import { get } from '@/services/cache'
import { useContext } from 'react'
import { SearchContext } from '@/context/SearchContext'

import { BiSolidBed, BiFilter } from 'react-icons/bi'
import { GiPerson } from 'react-icons/gi'
import { ImLocation } from 'react-icons/im'
import { availPayload } from '@/classes/availability/DTO/AvailabilityDTO'
import { localeCitiesData } from '@/classes/locales/DTO/LocaleDTO'

export default function PostSearch({
  setHasSearched,
}: {
  setHasSearched: any
}) {
  const searchingQuery: availPayload & {
    hotelCity: localeCitiesData
  } = get(CACHE_PATH.AVAILABILITY.SEARCH_QUERY)
  const { roomsHook, peopleHook, dateHook } = useContext(SearchContext)

  return (
    <div
      className="flex w-full flex-col items-center gap-4
      md:flex-row md:justify-start
      md:gap-8"
    >
      <div
        className="mr-2 flex w-full min-w-[6.5rem] rounded-b2b
        border border-borderColor/20 md:mr-0 md:max-w-[8.5rem]"
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
        className="flex flex-wrap items-center justify-center gap-4 text-primary
      md:justify-start"
      >
        <div className="flex items-center gap-2">
          <BiSolidBed className="h-5 w-5" />
          <p>{roomsHook.textRoom}</p>
        </div>
        <div className="flex items-center gap-2">
          <GiPerson className="h-5 w-5" />
          <p>{peopleHook.textAdult}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <ImLocation className="h-5 w-5" />
          <p>{`${searchingQuery.hotelCity.cityName.toLowerCase()}, ${
            searchingQuery.hotelCity.stateSymbol
          }`}</p>
        </div>
      </div>
      <div className="ml-auto hidden md:block">
        <Filter setHasSearched={setHasSearched} />
      </div>
    </div>
  )
}

const Filter = ({ setHasSearched }: any) => {
  return (
    <button
      type="button"
      onClick={() =>
        setHasSearched((prevState: boolean) => {
          return !prevState
        })
      }
    >
      <span className="flex flex-row items-center">
        <p className="mr-1 font-light text-textSecondary">
          Clique para abrir o filtro
        </p>
        <BiFilter />
      </span>
    </button>
  )
}
