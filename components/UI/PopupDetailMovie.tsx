import { PlayIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closePopupDetailMovie } from "../../redux/slices/detailMovie";
import Button from "./Button";
import MoreLikeThis from "./MoreLikeThis";
import TagList from "./TagList";

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
  if (!detailMovie.data) {
    return <></>;
  }
  if (detailMovie.loading) {
    return <div>loading</div>;
  }
  console.log(detailMovie);

  const imagePath = new URL(detailMovie.data?.coverHorizontalUrl as string);
  return (
    <div
      onClick={onClose}
      className={`fixed z-[500] overflow-auto flex top-0  justify-center w-full h-screen 
      transition-all duration-500 cursor-pointer bg-black/60
      ${!detailMovie.isOpen && "hidden"}
      `}
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
              alt={detailMovie.data?.name as string}
            />
          </picture>
        </div>
        <div className="flex gap-3 flex-col  top-[60%] px-10 mx-auto">
          <div className="flex gap-3">
            <Button variant="primary">
              <div className="flex items-center">
                <PlayIcon className="mr-1" width={30} />
                <span>Play</span>
              </div>
            </Button>
          </div>
          <TagList tagList={detailMovie.data.tagList} />
          <MoreLikeThis likeList={detailMovie.data.likeList} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
