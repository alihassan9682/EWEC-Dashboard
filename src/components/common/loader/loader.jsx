/** @format */

import React from "react";
import Lottie from "react-lottie";
import logo from "../../../assets/images/brand-logos/ims_logo.png";
import loadingAnimation from "../../../assets/images/brand-logos/loading.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      <div className="border border-[#cacbcc] bg-white bg-opacity-80 rounded-lg flex items-center justify-between max-w-sm h-28 shadow-lg">
        <div className="ml-8">
          <img src={logo} className="w-40" alt="Your Logo" />
        </div>
        <div className="flex items-center justify-center">
          <Lottie options={defaultOptions} height={160} width={160} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
