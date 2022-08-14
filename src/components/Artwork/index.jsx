import React from "react";
import classname from "classname";

export const Artwork = (props) => {
  const { className, size = 40, src = "" } = props;
  return (
    <img
      className={classname(size ? `w-${size}` : `w-20`, className)}
      src={src}
      alt="artwork-cover"
    ></img>
  );
};
