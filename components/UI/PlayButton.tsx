import { PlayIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { closePopupDetailMovie } from "../../redux/slices/detailMovie";
import { Movie, WatchType } from "../../shared/types";
import Button from "./Button";
interface PlayButtonProps {
  movie: Movie;
}
const PlayButton: FC<PlayButtonProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const watchType = movie.category === 1 ? WatchType.TV : WatchType.MOVIE;
  const history = useAppSelector((store) => store.history.entities[movie.id]);
  const handleOnClick = () => {
    dispatch(closePopupDetailMovie());
  };

  return (
    <Link onClick={handleOnClick} href={`${watchType}/${movie.id}`}>
      <Button variant="primary">
        <div className="flex items-center">
          <PlayIcon className="mr-1" width={30} />
          <span>{history ? "Resume" : "Play"}</span>
        </div>
      </Button>
    </Link>
  );
};

export default PlayButton;
