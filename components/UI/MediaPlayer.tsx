import { FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import getResourceMovie from "../../api/services/getResourceMovie";
import { useAppDispatch } from "../../hooks/redux";
import { updateHistory } from "../../redux/slices/history";
import { Movie, ResourceMovie, TypeResource } from "../../shared/types";

interface MediaPlayerProps {
  movie: Movie;
  id: string;
  category: number;
  episodeId: number;
}

const MediaPlayer: FC<MediaPlayerProps> = (props) => {
  const { episodeId, movie } = props;
  const dispatch = useAppDispatch();
  const episode = movie.episodeVo[episodeId];

  const coverHorizontalUrl = movie.coverHorizontalUrl;
  const [movieResource, setMovieResource] = useState<ResourceMovie[]>(
    [] as any
  );

  const player: any = useRef();

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
  }, [episode.definitionList, episode.id, movie.category, movie.id]);

  if (movieResource.length === 0) {
    return <></>;
  }

  const handleUpdateHistory = (event) => {
    dispatch(
      updateHistory({
        id: movie.id,
        changes: {
          currentTime: event.playedSeconds,
          totalTime: movieResource[0].totalDuration,
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
          url={movieResource[0].mediaUrl}
          controls
          onProgress={handleUpdateHistory}
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
