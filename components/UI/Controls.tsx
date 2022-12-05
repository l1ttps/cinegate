import { Square2StackIcon } from "@heroicons/react/24/outline";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  PauseIcon,
  PlayCircleIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import React, { forwardRef, useCallback } from "react";

import ReactPlayer from "react-player";

interface IControlsProps {
  duration: number;
  totalDuration: number;
  isFullscreen: boolean;
  currentTime: number;
  playing: boolean;
  muted: boolean;
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
  playbackRate: number;
  volume: number;
  onPlay: () => void;
  onPause: () => void;
  onSeekMouseDown: () => void;
  onSeekChange: (e: any) => void;
  onQuickSeek: (value: number) => void;
  onSeekMouseUp: (e: any) => void;
  onProgress: (e: any) => void;
  onDuration: (e: any) => void;
  onMute: () => void;
  onUnmute: () => void;
  onVolumeChange: (e: any) => void;
  onPlaybackRateChange: (e: number) => void;
  onToggleFullscreen: () => void;
  onTogglePIP: () => void;
}

const PLAYBACK_RATES = [0.25, 0.5, 1, 1.5, 2];

const Controls = forwardRef((props: IControlsProps, ref) => {
  const {
    duration,
    totalDuration,
    isFullscreen,
    currentTime,
    playing,
    muted,
    played,
    playedSeconds,
    loaded,
    loadedSeconds,
    playbackRate,
    volume,
    onPlay,
    onPause,
    onSeekMouseDown,
    onSeekChange,
    onQuickSeek,
    onSeekMouseUp,
    onProgress,
    onDuration,
    onMute,
    onUnmute,
    onVolumeChange,
    onPlaybackRateChange,
    onToggleFullscreen,
    onTogglePIP,
  } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [timeoutRef, setTimeoutRef] = React.useState<NodeJS.Timeout | null>(
    null
  );

  const onMouseMoveCapture = useCallback(() => {
    clearTimeout(timeoutRef!!);
    playing && setIsExpanded(true);

    setTimeoutRef(
      setTimeout(() => {
        setIsExpanded(false);
      }, 2000)
    );
  }, [playing, timeoutRef]);

  return (
    <div
      className="absolute flex flex-col items-center justify-end w-full h-full transition-all"
      onClick={() => {
        if (playing) {
          onPause();
        } else {
          onPlay();
        }
      }}
      onMouseMoveCapture={onMouseMoveCapture}
      onMouseLeave={() => {
        setIsExpanded(false);
      }}
    >
      <div
        className={`
        w-1/3 flex flex-row items-center justify-between
        absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 
        ${isExpanded ? "opacity-60" : "opacity-0"} transition-all duration-300
        `}
      >
        <button
          className="w-8"
          onClick={(e) => {
            e.stopPropagation();
            onQuickSeek(playedSeconds - 10);
          }}
        >
          <ArrowUturnLeftIcon />
        </button>
        {!playing && (
          <button className="w-16 h-16 text-red-500">
            <PlayCircleIcon />
          </button>
        )}
        <button
          className="w-8"
          onClick={(e) => {
            e.stopPropagation();
            onQuickSeek(playedSeconds + 10);
          }}
        >
          <ArrowUturnRightIcon />
        </button>
      </div>

      <div onClick={(e) => e.stopPropagation()} className="w-full bg-black/60">
        <div className="relative w-full h-1">
          <input
            type="range"
            min="0"
            max="100"
            value={played * 100}
            className="absolute bottom-0 left-0 z-20 w-full h-1 transition-all duration-300 bg-transparent opacity-0 appearance-none cursor-pointer hover:opacity-100"
            onMouseDown={onSeekMouseDown}
            onChange={onSeekChange}
            onMouseUp={onSeekMouseUp}
          />
          <div
            className={`absolute bottom-0 z-10 left-0 h-1 bg-red-500 transition-all duration-300`}
            style={{ width: `${played * 100}%` }}
          />
          <div
            className={`absolute z-0 bottom-0 left-0 h-1 bg-white/50 transition-all duration-300`}
            style={{ width: `${loaded * 100}%` }}
          />
        </div>
        <div
          className={`flex flex-row items-center justify-between w-full px-4 text-white
        ${
          isExpanded ? "opacity-100 h-10" : "opacity-0 h-0"
        } transition-all duration-300
        `}
        >
          <div className="flex flex-row items-center justify-start gap-4">
            <button
              className="w-6"
              onClick={() => {
                if (playing) {
                  onPause();
                } else {
                  onPlay();
                }
              }}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 tooltip-wrapper">
              <button
                className="w-6"
                onClick={() => {
                  if (muted) {
                    onUnmute();
                  } else {
                    onMute();
                  }
                }}
              >
                {SoundIcon(muted ? 0 : volume)}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={muted ? 0 : volume * 100}
                className="w-24 h-1 appearance-none cursor-pointer h-tooltip bg-white/50"
                onChange={onVolumeChange}
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <span>{format(playedSeconds)}</span>
              <span>/</span>
              <span>{format(totalDuration)}</span>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-4">
            <div className="relative cursor-pointer tooltip-wrapper">
              <span>{playbackRate}x</span>
              <ul className="absolute z-40 flex flex-col p-2 rounded-lg bottom-10 tooltip bg-black/80">
                {PLAYBACK_RATES.map((rate) => (
                  <li
                    key={rate}
                    className="cursor-pointer"
                    onClick={() => onPlaybackRateChange(rate)}
                  >
                    {rate}x
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="flex items-end justify-end w-6 h-5 border-2 border-white rounded"
              onClick={() => {
                onTogglePIP();
              }}
            >
              <div className="w-3 h-2 bg-white border-2 rounded-tl" />
            </button>
            <button
              className="w-6"
              onClick={() => {
                onToggleFullscreen();
              }}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon />
              ) : (
                <ArrowsPointingOutIcon />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Controls.displayName = "Controls";

const SoundIcon = (sound: number) => {
  if (sound === 0) {
    return <SpeakerXMarkIcon className="text-gray-700" />;
  } else {
    return (
      <div className="relative w-full h-full">
        <SpeakerWaveIcon className="text-gray-700" />
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${sound * 100}%` }}
        >
          <SpeakerWaveIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    );
  }
};

const format = (seconds) => {
  if (isNaN(seconds)) {
    return `00:00`;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export default React.memo(Controls);
