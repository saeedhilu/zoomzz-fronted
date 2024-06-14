import React from 'react';
import Header from '../components/layout/Header';
import TopRatedRooms from '../components/rooms/TopRatedRooms';

const HomePage = () => {
  const userLogoUrl = ''; 
  const websiteName = 'ZOOMZZZ'; 

  return (
    <div>
      <Header websiteName={websiteName} userLogoUrl={userLogoUrl} />
      <div className="container mx-auto mt-8">
        
        <TopRatedRooms />
      </div>
    </div>
  );
};

export default HomePage;
