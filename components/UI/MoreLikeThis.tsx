import classNames from "classnames";
import { FC } from "react";
import { LikeList } from "../../shared/types";
import ViewVote from "./ViewVote";
import ViewYear from "./ViewYear";

interface MoreLikeThisProps {
  likeList: LikeList[];
  forceGridCol?: boolean;
}

const MoreLikeThis: FC<MoreLikeThisProps> = ({ likeList, forceGridCol }) => {
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
