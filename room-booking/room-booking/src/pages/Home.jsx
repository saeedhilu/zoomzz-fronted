// pages/Home.js

import React from 'react';
import TopRatedRooms from '../components/rooms/TopRatedRooms';
import SearchBar from '../components/layout/SearchBar';


const Home = ({ location }) => {
  return (
    <div>
    <SearchBar/>    
    <TopRatedRooms/>
    </div>
  );
};

export default Home;
