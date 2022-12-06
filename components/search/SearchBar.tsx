import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { searchSuggestions } from "../../api/services/search";
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

  const handleClickToSearch = (text: string, e) => {
    e.stopPropagation();
    router.push(`search?q=${text.replace("<em>", "").replace("</em>", "")}`);
    handleFocusOutSearchBar();
    dispatch(onChangeTextSearch(""));
  };
  return (
    <div className="flex items-center px-2 mx-2 cursor-pointer">
      {search.isFocused ? (
        <div className="fixed left-0 right-0 md:relative z-[101] top-0  w-full lg:w-[25rem] h-[3rem] flex rounded-none md:rounded-lg bg-stone-800 px-2 py-1">
          <div className="flex flex-row items-center flex-1">
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
              onBlur={() => setTimeout(() => handleFocusOutSearchBar(), 500)}
              className="w-full px-3 outline-none bg-stone-800"
            />
          </div>
          <div onClick={handleFocusOutSearchBar} className="flex items-center">
            Cancel
          </div>
          {search.query.length > 0 && result.length > 0 && (
            <div className="absolute flex flex-col bg-stone-800 rounded-none md:rounded-lg top-[3rem] md:top-[4rem] max-h-[25rem] overflow-scroll w-full">
              {result.map((text) => (
                <div
                  onClick={(e) => handleClickToSearch(text, e)}
                  key={text}
                  className="w-full p-2 px-4 hover:bg-stone-700"
                >
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </div>
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
