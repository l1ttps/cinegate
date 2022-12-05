import { FC, useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";

import getResourceMovie from "../../api/services/getResourceMovie";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateHistory } from "../../redux/slices/history";
import { Movie, ResourceMovie, TypeResource } from "../../shared/types";
import Controls from "./Controls";

interface MediaPlayerProps {
  movie: Movie;
  id: string;
  category: number;
  episodeId: number;
}

const MediaPlayer: FC<MediaPlayerProps> = (props) => {
  const player = useRef<ReactPlayer>(null);
  const playerContainer = useRef<HTMLDivElement>(null);
  const { episodeId, movie } = props;
  const dispatch = useAppDispatch();
  const episode = movie.episodeVo[episodeId - 1];

  const history = useAppSelector((store) => store.history.entities[movie.id]);

  const timeToStart = useRef(history?.currentTime) || 0;

  const [movieResource, setMovieResource] = useState<ResourceMovie[]>(
    [] as any
  );
  const [state, setState] = useState({
    playing: false,
    muted: false, //redux
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    playbackRate: 1.0, // redux
    volume: 0.8, // redux
    duration: 0,
    currentTime: 0,
    pip: false,
  });

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

  // onPlay,
  const onPlay = useCallback(() => {
    setState((prevState) => ({ ...prevState, playing: true }));
  }, []);
  // onPause,
  const onPause = useCallback(() => {
    setState((prevState) => ({ ...prevState, playing: false }));
  }, []);
  // onSeekMouseDown,
  const onSeekMouseDown = useCallback(() => {
    setState((prevState) => ({ ...prevState, seeking: true }));
  }, []);
  // onSeekChange,
  const onSeekChange = useCallback((e) => {
    const played = parseFloat(e.target.value) / 100;
    setState((prevState) => ({
      ...prevState,
      played,
    }));
    player.current?.seekTo(played, "fraction");
  }, []);
  const onQuickSeek = useCallback((value) => {
    player.current?.seekTo(value, "seconds");
  }, []);
  // onSeekMouseUp,
  const onSeekMouseUp = useCallback((e) => {
    player.current?.seekTo(parseFloat(e.target.value) / 100, "fraction");
  }, []);
  // onProgress,
  const onProgress = useCallback(
    (event) => {
      setState((prev) => ({
        ...prev,
        played: event.played,
        playedSeconds: event.playedSeconds,
        loaded: event.loaded,
        loadedSeconds: event.loadedSeconds,
        duration: event.loadedSeconds,
        currentTime: event.playedSeconds,
      }));

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
    },
    [dispatch, episodeId, movie.id, movieResource]
  );
  // onDuration,
  const onDuration = useCallback(() => {}, []);
  // onMute,
  const onMute = useCallback(() => {
    setState((prevState) => ({ ...prevState, muted: true }));
  }, []);
  // onUnmute,
  const onUnmute = useCallback(() => {
    setState((prevState) => {
      if (prevState.volume === 0) {
        return { ...prevState, muted: false, volume: 0.7 };
      } else {
        return { ...prevState, muted: false };
      }
    });
  }, []);
  // onVolumeChange,
  const onVolumeChange = useCallback((e) => {
    const volume = parseFloat(e.target.value) / 100;
    setState((prevState) => {
      if (prevState.muted) {
        return { ...prevState, muted: false, volume };
      } else if (volume === 0) {
        return { ...prevState, muted: true, volume };
      } else {
        return {
          ...prevState,
          volume,
        };
      }
    });
  }, []);
  // onPlaybackRateChange,
  const onPlaybackRateChange = useCallback((value) => {
    setState((prevState) => ({ ...prevState, playbackRate: value }));
  }, []);
  // onToggleFullscreen,
  const onToggleFullscreen = useCallback(() => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit();
      } else {
        screenfull.request(playerContainer?.current!!);
      }
    }
  }, []);
  // onTogglePIP,
  const onTogglePIP = useCallback(() => {
    setState((prevState) => ({ ...prevState, pip: !prevState.pip }));
  }, []);

  useEffect(() => {
    try {
      // auto seek
      setTimeout(() => {
        player?.current &&
          player?.current?.seekTo(timeToStart.current!!, "seconds");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }, [timeToStart]);

  return movieResource.length != 0 ? (
    <div className="relative">
      <div ref={playerContainer} className="relative bg-black rounded-lg">
        <ReactPlayer
          ref={player}
          {...state}
          width={"100%"}
          height={"100%"}
          url={movieResource[0].mediaUrl.replace("http://", "https://")}
          onProgress={onProgress}
          onPause={onPause}
          onPlay={onPlay}
          onEnded={() => setState((prev) => ({ ...prev, playing: false }))}
          onReady={() => setState((prev) => ({ ...prev, playing: true }))}
        />
        <Controls
          {...state}
          isFullscreen={screenfull.isFullscreen}
          totalDuration={movieResource[0].totalDuration}
          onPlay={onPlay}
          onPause={onPause}
          onSeekMouseDown={onSeekMouseDown}
          onSeekChange={onSeekChange}
          onQuickSeek={onQuickSeek}
          onSeekMouseUp={onSeekMouseUp}
          onProgress={onProgress}
          onDuration={onDuration}
          onMute={onMute}
          onUnmute={onUnmute}
          onVolumeChange={onVolumeChange}
          onPlaybackRateChange={onPlaybackRateChange}
          onToggleFullscreen={onToggleFullscreen}
          onTogglePIP={onTogglePIP}
        />
      </div>
    </div>
  ) : (
    <picture>
      <img
        src={movie.coverHorizontalUrl}
        alt={movie.name}
        className="w-full h-full"
      />
    </picture>
  );
};

export default MediaPlayer;
