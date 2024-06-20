import React from "react";

const Banner = ({ bannerImage, title, buttontext, onclickButton }) => {
  return (
    <div
      className="banner bg-cover w-full h-[90vw] md:h-screen bg-center flex items-center p-10"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div>
        <h1 className="text-white text-5xl">{title}</h1>
        <button
          className="bg-gray-700 rounded-full p-4 mt-20 hover:bg-gray-900 text-white text-xl"
          onClick={onclickButton}
        >
          {buttontext}
        </button>
      </div>
    </div>
  );
};

export default Banner;
