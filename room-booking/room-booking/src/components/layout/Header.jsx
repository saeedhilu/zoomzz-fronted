import React from "react";
import SearchBar from "../layout/SearchBar";
import Navbar from "./Navbar";

const   Header = () => {
  const bgImage =
    "https://www.wakefit.co/guides/wp-content/uploads/2021/10/Modern-room-Banner.jpg";

  return (
    <header
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto flex sm:flex-row items-center justify-between  px-4 sm:px-8">
        <Navbar />
      </div>
      <div className="absolute w-full px-4 bottom-14">
        <div className="max-w-4xl mx-auto">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
