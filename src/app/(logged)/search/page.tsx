"use client";

import Container from "@/components/coreComponents/containers/Container";
import WhiteBox from "@/components/coreComponents/containers/WhiteBox";
import Title from "@/components/text/Title";
import "@/config/awsConfig";
import SearchIndex from "./(sections)/Search";
import PostResult from "./(sections)/Results/PostResult/PostResult";
import { useState } from "react";
import FeedbackSearch from "./(components)/(feedback)/SearchFeedback";
import { IAvailResponse } from "@/classes/availability/DTO/AvailabilityDTO";
import { CACHE_PATH } from "@/config/cache";
import { get } from "@/services/cache";

export default function Search() {
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const searchingResult: IAvailResponse = get(CACHE_PATH.AVAILABILITY.HOTELS);

  const getFeedbackSearchType = () => {
    if (isSearching) {
      return "processing";
    }
    if (hasSearched) {
      if (searchingResult.hotels.length === 0) return "noResults";
      return "default";
    }
    return "default";
  };

  return (
    <Container>
      <Title title="Pesquisa de Disponibilidade" />
      <WhiteBox>
        <SearchIndex
          hasSearched={hasSearched}
          setHasSearched={setHasSearched}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </WhiteBox>
      {hasSearched && <PostResult />}
      {hasSearched && searchingResult.hotels?.length > 0 && (
        <FeedbackSearch
          type={getFeedbackSearchType()}
          complementaryText={`${
            getFeedbackSearchType() === "default" ? "hotéis" : ""
          }`}
        />
      )}
    </Container>
  );
}
