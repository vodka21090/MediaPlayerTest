import React from "react";
import ReactPlayer from "react-player";
import { Artwork } from "../Artwork";
import { SeekBar } from "./SeekBar";
import { Controls } from "./Controls";

export const MediaPlayer = React.forwardRef(({ song, onNext, onPrevious, children }, ref) => {
  const playerRef = React.useRef();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [playedSeconds, setPlayedSeconds] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);

  const handleNext = () => {
    onNext();
  };
  const handlePrevious = () => {
    onPrevious();
  };

  const handleSeek = (seekTo) => {
    playerRef.current.seekTo(seekTo);
    setPlayedSeconds(seekTo);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onDuration = (duration) => {
    setDuration(duration);
  };
  const onProgress = ({ playedSeconds: _playedSeconds }) => {
    setPlayedSeconds(_playedSeconds);
  };
  const onReady = (player) => {
    setIsReady(true);
  };

  React.useImperativeHandle(
    ref,
    () => {
      return {
        handleNext,
        handlePrevious,
        handlePlayPause,
        handleSeek,
        duration,
        playedSeconds,
        isPlaying,
        isReady,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPlaying, isReady, playedSeconds]
  );

  React.useEffect(() => {
    setPlayedSeconds(0);
    setDuration(0);
  }, [song]);

  return (
    <div
      className="flex flex-col h-full items-center p-10 relative"
      style={
        song?.color && {
          backgroundImage: `linear-gradient(to right, ${song?.color[0]} , ${song?.color[1]})`,
        }
      }
    >
      <ReactPlayer
        ref={playerRef}
        controls={false}
        playing={isPlaying}
        url={song?.audio}
        width="0%"
        height="0%"
        onReady={onReady}
        onProgress={onProgress}
        onDuration={onDuration}
        onEnded={handleNext}
      ></ReactPlayer>

      <div className="flex flex-col w-full items-center justify-center">
        {children({
          handleNext,
          handlePrevious,
          handlePlayPause,
          handleSeek,
          duration,
          playedSeconds,
          isPlaying,
          isReady,
          song,
        })}
      </div>
    </div>
  );
});

//Use Can Replace Controls, SeekBar, Cover with any component you want
MediaPlayer.Controls = Controls;
MediaPlayer.SeekBar = SeekBar;
MediaPlayer.Cover = Artwork;
MediaPlayer.Info = ({ artist, name }) => {
  return (
    <div className="my-20">
      <h2 className="prose text-2xl font-bold  prose-headings">{name}</h2>
      <span className="text-sm">{artist}</span>
    </div>
  );
};
