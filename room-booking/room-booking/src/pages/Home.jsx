import React from "react";
// Components
import Header from "../components/layout/Header";
import TopRatedRooms from "../components/rooms/TopRatedRooms";
import Banner from "../components/layout/Banner";

const HomePage = () => {
  const userLogoUrl = "";
  const websiteName = "ZOOMZZZ";

  const handleOnclick = () => {
    alert("Hosting button is clicked");
  };

  return (
    <div>
      <Header websiteName={websiteName} userLogoUrl={userLogoUrl} />
      <div className=" mx-auto mt-20 p-4">
        <TopRatedRooms />
        <Banner onclickButton={handleOnclick} />
      </div>
    </div>
  );
};

export default HomePage;
