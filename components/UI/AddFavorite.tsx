import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FC, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addFavorite, removeFavorite } from "../../redux/slices/favoriteList";
import { Favorite, Movie } from "../../shared/types";

interface AddFavoriteProps {
  movie: Movie | Favorite;
}

const defaultPropsIcon = {
  width: 30,
  color: "white",
};

const AddFavorite: FC<AddFavoriteProps> = ({ movie }) => {
  const favoriteList = useAppSelector((store) => store.favoriteList);
  const dispatch = useAppDispatch();

  const favorite: Favorite = {
    id: movie.id,
    category: movie.category,
    coverHorizontalUrl: movie.coverHorizontalUrl,
    createdAt: new Date().valueOf(),
    name: movie.name,
  };

  const isFavorited = useMemo(() => {
    return favoriteList.ids.some((id) => id === favorite.id);
  }, [favorite.id, favoriteList.ids]);

  const handleOnClick = (e) => {
    e.preventDefault();
    if (isFavorited) {
      dispatch(removeFavorite(favorite.id));
      return;
    }
    dispatch(addFavorite(favorite));
  };
  return (
    <div className="flex items-center gap-2">
      <div
        onClick={handleOnClick}
        className="w-8 h-8 p-1 border-2 rounded-full cursor-pointer center hover:bg-stone-600 "
        title={`${isFavorited ? "Remove" : "Add"} favorite`}
      >
        {isFavorited ? (
          <CheckIcon {...defaultPropsIcon} />
        ) : (
          <PlusIcon {...defaultPropsIcon} />
        )}
      </div>
    </div>
  );
};

export default AddFavorite;
