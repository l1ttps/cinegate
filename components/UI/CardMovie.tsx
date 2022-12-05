import { FunctionComponent } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { RecommendContentVOList } from "../../shared/types";
import Image, { SizeType } from "../common/Image";

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
    <div
      onClick={handleClickDetailMovie}
      className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover rounded-lg cursor-pointer group"
    >
      <Image
        sizeType={SizeType.cardVertical}
        className="rounded-lg cursor-pointer hover:img-fade"
        height={246}
        width={175}
        src={movie.imageUrl}
        alt={movie.title}
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden transition duration-300 ease-in-out opacity-0 bg-gradient-to-r from-black via-stone-800 to-black hover:opacity-40"></div>
    </div>
  );
};

export default CardMovie;
