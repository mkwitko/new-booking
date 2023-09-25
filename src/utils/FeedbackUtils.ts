export const getFeedbackSearchType = ({
  isSearching,
  hasSearched,
  hotelsLength,
}: {
  isSearching: any;
  hasSearched: any;
  hotelsLength: any;
}) => {
  if (isSearching) {
    return "processing";
  }
  if (hasSearched) {
    if (hotelsLength === 0) return "noResults";
    return "default";
  }
  return "default";
};
