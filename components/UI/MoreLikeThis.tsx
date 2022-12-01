import { FC } from "react";
import { LikeList } from "../../shared/types";

interface MoreLikeThisProps {
  likeList: LikeList[];
}

const MoreLikeThis: FC<MoreLikeThisProps> = ({ likeList }) => {
  return (
    <div>
      <div className="mb-3 text-2xl">More like this</div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {likeList.map((movie) => {
          return (
            <div
              className="rounded-lg cursor-pointer bg-stone-600"
              key={movie.id}
            >
              <picture>
                <img
                  className="rounded-t-lg hover:rounded-lg hover:scale-125"
                  alt={movie.name}
                  src={movie.coverHorizontalUrl}
                />
              </picture>
              <div className="p-3">
                <div className="mb-1 text-green-500">
                  {(100 / 10) * movie.score}% Match
                </div>
                <div className="px-1 mb-3 border rounded-lg w-fit">
                  {movie.year}
                </div>
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
