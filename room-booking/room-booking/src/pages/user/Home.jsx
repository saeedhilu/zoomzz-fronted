import React from "react";
import Header from "../../components/layout/Header";
import TopRatedRooms from "../../components/rooms/TopRatedRooms";
import Banner from "../../components/layout/Banner";
import Footer from "../../components/layout/Footer";

const HomePage = () => {
  const handleOnclick = () => {
    alert("Hosting button is clicked");
  };

  return (
    <div>
      <Header />
      <div className=" mx-auto mt-20 p-4">
        <TopRatedRooms />
        <Banner onclickButton={handleOnclick} />
         <Footer/>
      </div>
     
    </div>
  );
};

export default HomePage;
