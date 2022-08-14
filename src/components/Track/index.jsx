import React from "react";
import { Artwork } from "../Artwork";
import classname from "classname";

export const Track = ({ name, cover, artist, audio, id, color, active }) => {
  return (
    <div
      className={classname("flex flex-no-wrap prose-gray p-2")}
      style={
        active
          ? {
              backgroundImage: `linear-gradient(to right, ${color[0]} , ${color[1]})`,
            }
          : null
      }
    >
      <div className="w-20">
        <Artwork src={cover}></Artwork>
      </div>
      <div className="flex flex-col justify-center mx-2">
        <h3 className="text-sm text-left items-center">{name}</h3>
        <p className="prose-sm prose-code text-xs text-gray-500 text-left">{artist}</p>
      </div>
    </div>
  );
};
