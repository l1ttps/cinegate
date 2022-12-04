import { XMarkIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import TimeLinePlayed from "../../components/UI/TimeLinePlayed";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { removeFavorite } from "../../redux/slices/favoriteList";
import { removeHistory } from "../../redux/slices/history";
import { Favorite } from "../../shared/types";

const History: NextPage = () => {
  const history = useAppSelector((store) => store.history);
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

  const handleRemoveHistory = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeHistory(id));
  };
  return (
    <Layout title="History">
      <div className="grid grid-cols-1 gap-5 my-5 md:grid-cols-2 lg:grid-cols-5">
        {history.ids.map((movieId) => {
          const movie = history.entities[movieId];
          return (
            movie && (
              <div
                onClick={() => handleClickDetailMovie(movie)}
                className="rounded-lg cursor-pointer group bg-stone-800 hover:bg-stone-700"
                key={movieId}
              >
                <div className="relative mb-3">
                  <div className="absolute right-0 h-5 px-2 py-3 bg-red-500 rounded-br-lg w-fit center">
                    {movie.episodeId}
                  </div>
                  <picture className="h-42">
                    <img
                      className="w-full rounded-lg rounded-b-none h-42"
                      src={movie?.coverHorizontalUrl}
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
                    onClick={(e) => handleRemoveHistory(e, movie.id)}
                    className="w-8 h-8 p-1 border-2 rounded-full cursor-pointer center hover:bg-stone-600 "
                    title={`Remove`}
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

export default History;
