"use client"

import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchReserves from './(sections)/Search/SearchReserves'
import { ReservesContextProvider } from '@/context/ReservesContext'
import TableReserves from './(sections)/Search/PostSearchReserves/TableReserves'
import { get } from '@/services/cache'
import { CACHE_PATH } from '@/config/cache'
import { useState } from 'react'
import FeedbackSearch from '../search/(components)/(feedback)/SearchFeedback'

export default function Reserves() {
  
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const reservesResult: any = get(CACHE_PATH.BOOKING.BOOKING_QUERY)

  const getFeedbackSearchType = () => {
    if (isSearching) {
      return "processing";
    }
    if (hasSearched) {
      if (reservesResult.reserves?.length === 0) return "noResults";
      return "default";
    }
    return "default";
  };

  return (
    <Container>
      <Title title="Busque por reservas" />
      <ReservesContextProvider>
        <WhiteBox>
          <SearchReserves 
            setHasSearched={setHasSearched}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        </WhiteBox>
        <TableReserves />
      </ReservesContextProvider>
      {hasSearched &&reservesResult?.reserves?.length > 0 ? (
        <></>
      ) : (
        <FeedbackSearch
          type={getFeedbackSearchType()}
          complementaryText={`${
            getFeedbackSearchType() === "default" ? "reservas" : ""
          }`}
        />
      )}
    </Container>
  )
}
