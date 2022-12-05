import api, { apiResource } from "..";
import { SearchResult } from "../../shared/types";

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

const searchWithKeyWord = async (
  searchKeyWord: string
): Promise<SearchResult[]> =>
  (
    await api.post(apiResource.searchWithKeyWord, {
      searchKeyWord,
      size: 50,
      searchType: "",
      sort: "",
    })
  ).data.data.searchResults;

export { searchSuggestions, searchWithKeyWord };
