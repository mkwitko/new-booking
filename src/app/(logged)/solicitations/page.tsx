"use client"

import Container from '@/components/coreComponents/containers/Container'
import WhiteBox from '@/components/coreComponents/containers/WhiteBox'
import Title from '@/components/text/Title'
import SearchSolicitations from './Search/SearchSolicitations'
import { SolicitationsContextProvider } from '@/context/SolicitationsContext'
import { get } from '@/services/cache'
import { useState } from 'react'
import { CACHE_PATH } from '@/config/cache'
import FeedbackSearch from '../search/(components)/(feedback)/SearchFeedback'

export default function Solicitations() {
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const solicitationResult: any = get(CACHE_PATH.SOLICITATION.SOLICITATION_QUERY)

  const getFeedbackSearchType = () => {
    if (isSearching) {
      return "processing";
    }
    if (hasSearched) {
      if (solicitationResult.solicitation?.length === 0) return "noResults";
      return "default";
    }
    return "default";
  };
  return (
    <Container>
      <Title title="Solicitações" />
      <WhiteBox>
        <SolicitationsContextProvider>
          <SearchSolicitations 
            setHasSearched={setHasSearched}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        </SolicitationsContextProvider>
      </WhiteBox>
      {hasSearched && solicitationResult?.solicitation?.length > 0 ? (
        <></>
      ) : (
        <FeedbackSearch
          type={getFeedbackSearchType()}
          complementaryText={`${
            getFeedbackSearchType() === "default" ? "solicitações" : ""
          }`}
        />
      )}
    </Container>
  )
}
