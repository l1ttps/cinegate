import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closePopupDetailMovie } from "../../redux/slices/detailMovie";
import { getImage, SizeType } from "../common/Image";
import AddFavorite from "./AddFavorite";
import BackdropLoading from "./BackdropLoading";
import Episodes from "./Episodes";
import MoreLikeThis from "./MoreLikeThis";
import PlayButton from "./PlayButton";
import TagList from "./TagList";
import TimeLinePlayed from "./TimeLinePlayed";
import ViewDescription from "./ViewDescription";
import ViewVote from "./ViewVote";
import ViewYear from "./ViewYear";
interface IProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal = (props: IProps) => {
  const ref = useRef();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const detailMovie = useAppSelector((store) => store.detailMovie);
  const dispatch = useAppDispatch();
  const movie = detailMovie.data;

  const onClose = () => {
    dispatch(closePopupDetailMovie());
  };

  if (detailMovie.loading || isLoadingImage) {
    return <BackdropLoading />;
  }

  if (!movie) {
    return <></>;
  }

  const imagePath = new URL(movie?.coverHorizontalUrl as string);

  return (
    <div
      onClick={onClose}
      className={`fixed z-[500] overflow-auto flex top-0  justify-center w-full h-screen 
      transition-all duration-500 cursor-pointer bg-black/60
      ${!detailMovie.isOpen && "hidden"}`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative flex flex-col w-full pb-10 border-0 rounded-lg shadow-lg cursor-default h-fit lg:w-1/2 md:w-2/3 bg-default"
      >
        <button
          className="absolute z-10 float-right p-1 text-black rounded-full top-5 right-5 bg-stone-900"
          onClick={onClose}
        >
          <XMarkIcon color="white" className="w-6" />
        </button>
        <div className="w-full z-1 img-fade">
          <picture>
            <img
              onLoad={() => setIsLoadingImage(false)}
              onLoadStart={() => setIsLoadingImage(true)}
              className="w-full z-1 rounded-xl"
              src={getImage(imagePath.href, SizeType.fullSize)}
              alt={movie?.name as string}
            />
          </picture>
        </div>
        <div className="flex gap-3 flex-col  top-[60%] px-2 md:px-10 mx-auto">
          <div className="flex items-center gap-3">
            <PlayButton movie={movie} />
            <AddFavorite movie={movie} />
          </div>
          <TimeLinePlayed movieId={movie.id} />
          <span className="text-2xl font-bold">{movie.name}</span>
          <div className="flex">
            <div className="mr-3">
              <ViewYear year={movie.year} />
            </div>
            <ViewVote score={movie.score} />
          </div>
          <ViewDescription text={movie.introduction} />
          <TagList tagList={movie.tagList} />
          <Episodes movie={movie} />
          <MoreLikeThis likeList={movie.likeList} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
