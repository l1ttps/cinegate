import { FunctionComponent } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { RecommendContentVOList } from "../../shared/types";
import Image from "../common/Image";

interface CardMovieProps {
  movie: RecommendContentVOList;
}

const CardMovie: FunctionComponent<CardMovieProps> = (props) => {
  const { movie } = props;
  const dispatch = useAppDispatch();

  const handleClickDetailMovie = () => {
    const { id, category } = movie;
    dispatch(openPopupDetailMovie());
    dispatch(fetchDetailMovie({ id, category }));
  };
  return (
    <div className="rounded-lg group">
      <Image
        onClick={handleClickDetailMovie}
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
