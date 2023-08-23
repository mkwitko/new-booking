import PreSearch from './PreSearch/PreSearch';
import PostSearch from './PostSearch/PostSearch';

export default function SearchIndex({
  hasSearched,
  setHasSearched,
  isSearching,
  setIsSearching,
}: {
  hasSearched: boolean;
  setHasSearched: any;
  isSearching: boolean;
  setIsSearching: any;
}) {
  return !hasSearched ? (
    <PreSearch
      hasSearched={hasSearched}
      setHasSearched={setHasSearched}
      isSearching={isSearching}
      setIsSearching={setIsSearching}
    />
  ) : (
    <PostSearch setHasSearched={setHasSearched} />
  );
}
