import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import searchSuggestions from "../../api/services/searchSuggestions";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  focusInSearchBar,
  focusOutSearchBar,
  onChangeTextSearch,
} from "../../redux/slices/search";
const SearchBar: FC = () => {
  const router = useRouter();
  const [result, setResult] = useState<string[]>([]);
  const search = useAppSelector((store) => store.search);
  const dispatch = useAppDispatch();

  const handleFocusInSearchBar = () => {
    dispatch(focusInSearchBar());
  };

  const handleFocusOutSearchBar = () => {
    dispatch(focusOutSearchBar());
    // dispatch(onChangeTextSearch(""));
  };

  const handleOnChangeText = ({ target: { value } }) => {
    dispatch(onChangeTextSearch(value));
    if (value.length > 0) {
      debounceFn(value);
      return;
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue) {
    searchSuggestions(inputValue, 10).then((res) => {
      setResult(res);
    });
  }

  return (
    <div className="relative items-center hidden cursor-pointer md:flex">
      {search.isFocused ? (
        <div className="w-[25rem] h-[3rem] flex rounded-lg bg-stone-800 px-2 py-1">
          <MagnifyingGlassIcon
            onClick={handleFocusOutSearchBar}
            color="white"
            width={30}
          />
          <input
            placeholder="Search"
            value={search.query}
            onChange={handleOnChangeText}
            autoFocus
            // onBlur={handleFocusOutSearchBar}
            className="w-full px-3 outline-none bg-stone-800"
          />
          {search.query.length > 0 && result.length > 0 && (
            <div className="absolute flex flex-col bg-stone-800 rounded-lg top-[4rem] max-h-[25rem] overflow-scroll w-full">
              {result.map((text) => (
                <Link
                  href={`search?q=${text
                    .replace("<em>", "")
                    .replace("</em>", "")}`}
                  key={text}
                  className="w-full p-2 px-4 hover:bg-stone-700"
                >
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <MagnifyingGlassIcon
          onClick={handleFocusInSearchBar}
          color="white"
          width={30}
        />
      )}
    </div>
  );
};

export default SearchBar;
