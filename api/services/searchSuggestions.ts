import api, { apiResource } from "..";

const searchSuggestions = async (
  searchKeyWord: string,
  size: number
): Promise<string[]> =>
  (
    await api.post(apiResource.searchSuggestions, {
      searchKeyWord,
      size,
    })
  ).data.data.searchResults;

export default searchSuggestions;
