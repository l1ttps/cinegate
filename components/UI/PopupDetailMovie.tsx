import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closePopupDetailMovie } from "../../redux/slices/detailMovie";
import { Favorite } from "../../shared/types";
import AddFavorite from "./AddFavorite";
import BackdropLoading from "./BackdropLoading";
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
  const detailMovie = useAppSelector((store) => store.detailMovie);
  const dispatch = useAppDispatch();
  const movie = detailMovie.data;

  const onClose = () => {
    dispatch(closePopupDetailMovie());
  };

  if (detailMovie.loading) {
    return <BackdropLoading />;
  }

  if (!movie) {
    return <></>;
  }

  console.log(detailMovie);

  const imagePath = new URL(movie?.coverHorizontalUrl as string);

  const dataFavorite: Favorite = {
    id: movie.id,
    coverHorizontalUrl: movie.coverHorizontalUrl,
    createdAt: new Date().valueOf(),
    name: movie.name,
  };

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
        className="relative flex flex-col w-5/6 pb-10 border-0 rounded-lg shadow-lg cursor-default h-fit lg:w-1/2 md:w-2/3 bg-default"
      >
        <button
          className="absolute z-10 float-right p-1 text-black rounded-full top-5 right-5 bg-stone-900"
          onClick={onClose}
        >
          <XMarkIcon color="white" className="w-6" />
        </button>
        <div className="w-full img-fade">
          <picture>
            <img
              className="hidden md:inline-block z-1 rounded-xl"
              src={imagePath.href}
              alt={movie?.name as string}
            />
          </picture>
        </div>
        <div className="flex gap-3 flex-col  top-[60%] px-10 mx-auto">
          <div className="flex items-center gap-3">
            <PlayButton movie={movie} />
            <AddFavorite favorite={dataFavorite} />
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
          <MoreLikeThis likeList={movie.likeList} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
