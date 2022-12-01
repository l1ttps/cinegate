import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FC, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addFavorite, removeFavorite } from "../../redux/slices/favoriteList";
import { Favorite } from "../../shared/types";

interface AddFavoriteProps {
  favorite: Favorite;
}

const defaultPropsIcon = {
  width: 30,
  color: "white",
};

const AddFavorite: FC<AddFavoriteProps> = ({ favorite }) => {
  const favoriteList = useAppSelector((store) => store.favoriteList);
  const dispatch = useAppDispatch();

  const isFavorited = useMemo(() => {
    return favoriteList.ids.some((id) => id === favorite.id);
  }, [favorite.id, favoriteList.ids]);

  const handleOnClick = () => {
    if (isFavorited) {
      dispatch(removeFavorite(favorite.id));
      return;
    }
    dispatch(addFavorite(favorite));
  };
  return (
    <div
      onClick={handleOnClick}
      className="w-8 h-8 p-1 border-2 rounded-full cursor-pointer center hover:bg-stone-600 "
      title="Add favorite"
    >
      {isFavorited ? (
        <CheckIcon {...defaultPropsIcon} />
      ) : (
        <PlusIcon {...defaultPropsIcon} />
      )}
    </div>
  );
};

export default AddFavorite;
