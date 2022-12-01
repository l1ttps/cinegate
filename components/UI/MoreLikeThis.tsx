import { FC } from "react";
import { LikeList } from "../../shared/types";
import ViewVote from "./ViewVote";
import ViewYear from "./ViewYear";

interface MoreLikeThisProps {
  likeList: LikeList[];
}

const MoreLikeThis: FC<MoreLikeThisProps> = ({ likeList }) => {
  return (
    <div>
      <div className="mb-3 text-2xl font-bold">More like this</div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {likeList.map((movie) => {
          return (
            <div
              className="rounded-lg shadow-lg cursor-pointer hover:rounded-lg hover:scale-125 bg-stone-600 hover:bg-stone-700"
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

export default MoreLikeThis;
