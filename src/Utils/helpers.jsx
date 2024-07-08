/** @format */

import React from "react";
import face from "../assets/images/faces/21.jpg";

export const renderImage = (base64String, w = 10, h = 10) => {
  const placeholderImage = face;

  if (!base64String) {
    return (
      <img
        src={
          placeholderImage
        }
        alt="Profile"
        className={`w-${w} h-${h} object-cover rounded-full`}
      />
    );
  }

  const isDataURL = base64String.startsWith("data:image/");

  return (
    <img
      src={isDataURL ? base64String : `data:image/jpeg;base64,${base64String}`}
      alt="Profile"
      className={`w-${w} h-${h} object-cover rounded-full`}
    />
  );
};
