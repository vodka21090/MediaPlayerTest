import React from "react";
import { formatSeconds } from "../../../helper";

export const SeekBar = ({ duration, currentTime, onSeekTo }) => {
  const transformPlayedToPercent = React.useMemo(() => {
    if (!currentTime) return 0;
    return (currentTime / duration) * 100;
  }, [currentTime, duration]);

  const onChange = (e) => {
    let target = e.target;
    if (e.target.type !== "range") {
      target = document.getElementById("seeker");
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;
    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    onSeekTo((val * duration) / 100);
  };

  return (
    <div className="flex w-full justify-center items-center gap-2">
      <p>{formatSeconds(currentTime)}</p>
      <input
        onChange={onChange}
        id="seeker"
        type="range"
        value={transformPlayedToPercent}
        className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer"
      ></input>
      <p>{formatSeconds(duration)}</p>
    </div>
  );
};
