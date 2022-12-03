import classNames from "classnames";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { LikeList } from "../../shared/types";
import ViewVote from "./ViewVote";
import ViewYear from "./ViewYear";

interface MoreLikeThisProps {
  likeList: LikeList[];
  forceGridCol?: boolean;
}

const MoreLikeThis: FC<MoreLikeThisProps> = ({ likeList, forceGridCol }) => {
  const dispatch = useAppDispatch();

  const handleClickDetailMovie = (detailMovie) => {
    const { id, category } = detailMovie;
    dispatch(openPopupDetailMovie());
    dispatch(fetchDetailMovie({ id: parseInt(id), category }));
  };

  return (
    <div>
      <div className="mb-3 text-2xl font-bold">More like this</div>
      <div
        className={classNames([
          "grid w-full  gap-4 ",
          forceGridCol
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4",
        ])}
      >
        {likeList.map((movie) => {
          return (
            <div
              onClick={() => handleClickDetailMovie(movie)}
              className="rounded-lg shadow-lg cursor-pointer bg-stone-600 hover:bg-stone-800"
              key={movie.id}
            >
              <picture>
                <img
                  className="rounded-t-lg"
                  alt={movie.name}
                  src={movie.coverHorizontalUrl}
                />
              </picture>
              <div className="p-3">
                <ViewVote score={movie.score} />
                <ViewYear year={movie.year} />
                <div className="text-sm">{movie.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

MoreLikeThis.defaultProps = {
  forceGridCol: false,
};
export default MoreLikeThis;
