'use client';

import Container from '@/components/coreComponents/containers/Container';
import WhiteBox from '@/components/coreComponents/containers/WhiteBox';
import Title from '@/components/text/Title';
import '@/config/awsConfig';
import { SearchContextProvider } from '@/context/SearchContext';
import SearchIndex from './(sections)/Search';
import PostResult from './(sections)/Results/PostResult/PostResult';
import { useState } from 'react';

export default function Search() {
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <Container>
      <Title title="Pesquisa de Disponibilidade" />
      <SearchContextProvider>
        <WhiteBox>
          <SearchIndex
            hasSearched={hasSearched}
            setHasSearched={setHasSearched}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        </WhiteBox>
        {hasSearched && <PostResult />}
      </SearchContextProvider>
    </Container>
  );
}
