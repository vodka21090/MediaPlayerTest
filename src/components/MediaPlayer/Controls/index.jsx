import React from "react";
import { IconButton } from "../../IconButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
export const Controls = ({ isPlaying, onPrevious, onPlayPause, onNext }) => {
  return (
    <div className="flex w-1/2 m-auto justify-between">
      <IconButton
        onClick={onPrevious}
        icon={<ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>}
      ></IconButton>
      {isPlaying ? (
        <IconButton
          onClick={onPlayPause}
          icon={<PauseCircleIcon fontSize="large"></PauseCircleIcon>}
        ></IconButton>
      ) : (
        <IconButton
          onClick={onPlayPause}
          icon={<PlayArrowIcon fontSize="large"></PlayArrowIcon>}
        ></IconButton>
      )}

      <IconButton
        onClick={onNext}
        icon={<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon>}
      ></IconButton>
    </div>
  );
};
