import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closePopupDetailMovie } from "../../redux/slices/detailMovie";
import Image from "../common/Image";

interface IProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal = (props: IProps) => {
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
      className={`fixed z-[500] flex top-0 items-center justify-center w-full h-screen 
      transition-all duration-500 cursor-pointer bg-black/60
      ${!detailMovie.isOpen && "hidden"}
      `}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="relative h-[80%]  flex flex-col w-1/2 border-0 rounded-lg shadow-lg cursor-default bg-default"
      >
        <button
          className="absolute z-10 float-right p-1 text-black rounded-full top-5 right-5 bg-stone-900"
          onClick={onClose}
        >
          <XMarkIcon color="white" className="w-6" />
        </button>
        <Image
          className="hidden md:inline-block z-1 rounded-xl"
          unoptimized
          src={imagePath.href}
          alt={detailMovie.data?.name as string}
          fill
        />
        <div className="relative flex-auto p-6"></div>
      </div>
    </div>
  );
};

export default Modal;
