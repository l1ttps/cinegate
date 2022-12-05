import { XMarkIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import { getImage, SizeType } from "../../components/common/Image";
import Layout from "../../components/Layout";
import TimeLinePlayed from "../../components/UI/TimeLinePlayed";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { removeFavorite } from "../../redux/slices/favoriteList";
import { Favorite } from "../../shared/types";

const MyList: NextPage = () => {
  const favoriteList = useAppSelector((store) => store.favoriteList);
  const dispatch = useAppDispatch();
  const handleClickDetailMovie = (movie: Favorite) => {
    const { id, category } = movie;
    if (id && category) {
      dispatch(openPopupDetailMovie());
      dispatch(fetchDetailMovie({ id: parseInt(id), category }));
      return;
    }
    dispatch(removeFavorite(id));
  };

  const handleRemoveFavorite = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFavorite(id));
  };
  return (
    <Layout title="My list">
      <div className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-5">
        {favoriteList.ids.map((movieId) => {
          const movie = favoriteList.entities[movieId];
          return (
            movie && (
              <div
                onClick={() => handleClickDetailMovie(movie)}
                className="rounded-lg cursor-pointer group bg-stone-800 hover:bg-stone-700"
                key={movieId}
              >
                <div className="mb-3">
                  <picture>
                    <img
                      className="w-full rounded-lg rounded-b-none h-42"
                      src={getImage(
                        movie?.coverHorizontalUrl,
                        SizeType.cardHorizontal
                      )}
                      alt={movie?.name}
                    />
                  </picture>
                  <TimeLinePlayed
                    fullWidth
                    showTime={false}
                    movieId={movie.id}
                  />
                </div>
                <div className="flex items-center justify-between px-3 pb-3 truncate group-lg-hover:flex">
                  <div className="mr-3 font-semibold truncate">
                    {movie?.name}
                  </div>
                  <div
                    onClick={(e) => handleRemoveFavorite(e, movie.id)}
                    className="w-8 h-8 p-1 border-2 rounded-full cursor-pointer center hover:bg-stone-600 "
                    title={`Remove favorite`}
                  >
                    <XMarkIcon width={30} color="white" />
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </Layout>
  );
};

export default MyList;
