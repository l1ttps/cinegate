import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closePopupDetailMovie } from "../../redux/slices/detailMovie";
import { Movie, WatchType } from "../../shared/types";

interface EpisodesProps {
  movie: Movie;
}
const Episodes: FC<EpisodesProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const watchType = movie.category === 1 ? WatchType.TV : WatchType.MOVIE;
  const handleOnClick = () => {
    dispatch(closePopupDetailMovie());
  };

  const history = useAppSelector((store) => store.history.entities[movie.id]);

  if (movie.episodeVo.length <= 1) {
    return <></>;
  }

  return (
    <>
      <div className="mb-1 text-2xl font-bold">Episodes</div>
      <div className="flex flex-wrap gap-3 mb-5">
        {movie.episodeVo.map((episode, index) => (
          <Link
            onClick={handleOnClick}
            href={`../${watchType}/${movie.id}?episode=${index + 1}`}
            className={classNames([
              "flex items-center w-10 h-10 gap-3 p-3 rounded cursor-pointer center ",
              history?.episodeId === index + 1
                ? "bg-red-500 hover:bg-red-700"
                : "hover:bg-stone-800 bg-stone-700",
            ])}
            key={episode.id}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Episodes;
