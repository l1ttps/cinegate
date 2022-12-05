import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  focusInSearchBar,
  focusOutSearchBar,
  onChangeTextSearch,
} from "../../redux/slices/search";

const SearchBar: FC = () => {
  const router = useRouter();
  const search = useAppSelector((store) => store.search);
  const dispatch = useAppDispatch();

  const handleOnChangeText = ({ target: { value } }) => {
    dispatch(onChangeTextSearch(value));
  };

  const handleFocusInSearchBar = () => {
    dispatch(focusInSearchBar());
  };

  const handleFocusOutSearchBar = () => {
    dispatch(focusOutSearchBar());
    dispatch(onChangeTextSearch(""));
  };
  return (
    <div className="relative items-center hidden cursor-pointer md:flex">
      {search.isFocused ? (
        <div className="w-[30rem] h-[3rem] flex rounded-lg bg-stone-800 px-2 py-1">
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
            onBlur={handleFocusOutSearchBar}
            className="w-full px-3 outline-none bg-stone-800"
          />
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
