import React from "react";
import { SidebarLayout } from "../../components/layouts";
import { MediaPlayer } from "../../components/MediaPlayer";
import { Track } from "../../components/Track";
import chillHop from "../../fixtures/songs";

export const Media = () => {
  const mediaPlayerRef = React.useRef();
  const [songs, setSongs] = React.useState([]);
  const [currentSong, setCurrentSong] = React.useState(null);

  const onChangeSong = React.useCallback(
    (id) => () => {
      const nextStateSongs = songs.reduce((acc, current) => {
        if (current.id === id) {
          setCurrentSong(current);
          acc.push({ ...current, active: true });
          return acc;
        }
        acc.push({ ...current, active: false });
        return acc;
      }, []);
      setSongs(nextStateSongs);
    },
    [songs]
  );

  const getIndexSong = () => {
    const currentIndex = songs.findIndex(({ id }) => id === currentSong.id);
    return {
      currentIndex,
      nextIndex: currentIndex + 1,
      previousIndex: currentIndex - 1,
    };
  };
  const onNext = () => {
    const nextSongs = [...songs];
    const { currentIndex, nextIndex } = getIndexSong();
    nextSongs[currentIndex] = { ...nextSongs[currentIndex], active: false };
    const nextSong = nextSongs[nextIndex];
    if (!nextSong) {
      mediaPlayerRef.current.isPlaying && mediaPlayerRef.current.handlePlayPause();
      return;
    }
    nextSongs[nextIndex] = { ...nextSongs[nextIndex], active: true };
    setCurrentSong(nextSong);
    setSongs(nextSongs);
  };

  const onPrevious = () => {
    const nextSongs = [...songs];
    const { currentIndex, previousIndex } = getIndexSong();
    nextSongs[currentIndex] = { ...nextSongs[currentIndex], active: false };
    const previousSong = nextSongs[previousIndex];
    if (!previousSong) {
      mediaPlayerRef.current.isPlaying && mediaPlayerRef.current.handlePlayPause();
      return;
    }
    nextSongs[previousIndex] = { ...nextSongs[previousIndex], active: true };
    setCurrentSong(previousSong);
    setSongs(nextSongs);
  };

  const renderListSong = React.useCallback(() => {
    return (
      <div className="h-screen my-2">
        <h5 className="ml-4 my-8 text-2xl font-bold text-left tracking-tight">Library</h5>
        <ul className="h-[90%] scroll-smooth space-y-2 overflow-y-auto snap-y">
          {songs.map(({ id, ...trackProps }) => {
            return (
              <li
                className="snap-center cursor-pointer hover:bg-gray-100"
                key={id}
                onClick={onChangeSong(id)}
              >
                <Track {...trackProps}></Track>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }, [onChangeSong, songs]);

  React.useEffect(() => {
    const _songs = chillHop();
    setSongs(_songs);
    const activeSong = _songs.find(({ active }) => !!active);
    setCurrentSong(activeSong);
  }, []);

  return (
    <SidebarLayout renderSideBar={renderListSong}>
      <MediaPlayer ref={mediaPlayerRef} song={currentSong} onNext={onNext} onPrevious={onPrevious}>
        {(mediaPlayerProps) => {
          if (!mediaPlayerProps.isReady) {
            return null;
          }
          return (
            <>
              <MediaPlayer.Cover
                className="rounded-xl"
                size={80}
                src={mediaPlayerProps.song?.cover}
              ></MediaPlayer.Cover>
              <MediaPlayer.Info
                artist={mediaPlayerProps.song?.artist}
                name={mediaPlayerProps.song?.name}
              ></MediaPlayer.Info>
              <MediaPlayer.SeekBar
                onSeekTo={mediaPlayerProps.handleSeek}
                currentTime={mediaPlayerProps.playedSeconds}
                duration={mediaPlayerProps.duration}
              ></MediaPlayer.SeekBar>

              <MediaPlayer.Controls
                onPrevious={mediaPlayerProps.handlePrevious}
                onNext={mediaPlayerProps.handleNext}
                onPlayPause={mediaPlayerProps.handlePlayPause}
                isPlaying={mediaPlayerProps.isPlaying}
              ></MediaPlayer.Controls>
            </>
          );
        }}
      </MediaPlayer>
    </SidebarLayout>
  );
};
