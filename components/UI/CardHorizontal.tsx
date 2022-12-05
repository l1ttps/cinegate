import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { getImage, SizeType } from "../common/Image";

interface CardHorizontalProps {
  coverHorizontalUrl: string;
  id: number;
  category: number;
  name: string;
}

const CardHorizontal: FC<CardHorizontalProps> = (props) => {
  const { coverHorizontalUrl, id, category, name } = props;
  console.log(category, "category");
  const dispatch = useAppDispatch();
  const handleClickDetailMovie = () => {
    dispatch(openPopupDetailMovie());
    dispatch(fetchDetailMovie({ id, category }));
  };
  return (
    <div
      onClick={handleClickDetailMovie}
      className="relative overflow-hidden bg-no-repeat bg-cover rounded-lg cursor-pointer group"
    >
      <picture className="w-full">
        <img
          className="w-full h-full rounded-lg rounded-b-none"
          src={getImage(coverHorizontalUrl, SizeType.cardHorizontal)}
          alt={name}
        />
      </picture>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden transition duration-300 ease-in-out opacity-0 bg-gradient-to-r from-black via-stone-800 to-black hover:opacity-40"></div>
    </div>
  );
};

export default CardHorizontal;
