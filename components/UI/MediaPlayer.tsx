import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import getResourceMovie from "../../api/services/getResourceMovie";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateHistory } from "../../redux/slices/history";
import { Movie, ResourceMovie, TypeResource } from "../../shared/types";

interface MediaPlayerProps {
  movie: Movie;
  id: string;
  category: number;
  episodeId: number;
}

const MediaPlayer: FC<MediaPlayerProps> = (props) => {
  const player: any = useRef();
  const { episodeId, movie } = props;
  const dispatch = useAppDispatch();
  const episode = movie.episodeVo[episodeId - 1];

  const history = useAppSelector((store) => store.history.entities[movie.id]);

  const timeToStart = useRef(history?.currentTime) || 0;

  const [movieResource, setMovieResource] = useState<ResourceMovie[]>(
    [] as any
  );

  useEffect(() => {
    (async () => {
      const _movieResource = await Promise.all(
        episode.definitionList.map((definition) =>
          getResourceMovie(
            movie.id,
            movie.category,
            episode.id,
            TypeResource[definition.code]
          )
        )
      ).then((res) => res.filter((data) => data));
      setMovieResource(_movieResource);
    })();
  }, [
    episode.definitionList,
    episode.id,
    movie.category,
    movie.id,
    timeToStart,
  ]);

  useEffect(() => {
    // auto seek
    setTimeout(() => {
      player.current && player.current.seekTo(timeToStart.current, "seconds");
    }, 1000);
  }, [timeToStart]);

  if (movieResource.length === 0) {
    return (
      <picture>
        <img
          src={movie.coverHorizontalUrl}
          alt={movie.name}
          className="w-full h-full"
        />
      </picture>
    );
  }

  const handleUpdateHistory = (event) => {
    dispatch(
      updateHistory({
        id: movie.id,
        changes: {
          currentTime: event.playedSeconds,
          totalTime: movieResource[0].totalDuration,
          episodeId,
        },
      })
    );
  };

  return (
    <div className="relative">
      <div className="bg-black rounded-lg player-wrapper">
        <ReactPlayer
          ref={player}
          width={"100%"}
          playing
          height={"100%"}
          url={movieResource[0].mediaUrl.replace("http://", "https://")}
          controls
          onProgress={handleUpdateHistory}
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
