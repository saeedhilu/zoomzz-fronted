import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import RoomListPage from './pages/RoomListPage';
import ReservationStatusListPage from './pages/ReservationsStatusPage';
import RoomDetail from './pages/RoomDetails';
import Booking from './pages/Booking';
import UserProfilePage from './pages/UserProfilePage';
import WhishlistPage from './pages/Whishlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/room-list" element={<RoomListPage />} />
      <Route path="/reservations-status" element={<ReservationStatusListPage />} />
      <Route path="/room-details/:roomId" element={<RoomDetail />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/user-profile" element={<UserProfilePage />} />
      <Route path="/user-whishlist" element={<WhishlistPage />} />
    </Routes>
  );
}

export default App;
