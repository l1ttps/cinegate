import { FunctionComponent } from "react";
import { RecommendContentVOList } from "../../shared/types";
import Image from "../common/Image";

interface CardMovieProps {
  movie: RecommendContentVOList;
}

const CardMovie: FunctionComponent<CardMovieProps> = (props) => {
  const { movie } = props;
  return (
    <div className="hover:scale-110 hover:bg-red-500">
      <Image
        onClick={() => alert(1)}
        className="rounded-lg cursor-pointer hover:opacity-1"
        height={246}
        width={175}
        src={movie.imageUrl}
        alt={movie.title}
      />
    </div>
  );
};

export default CardMovie;
