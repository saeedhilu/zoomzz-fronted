import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../auth/protectedrouted/ProtectedRoute";
import Navbar from "../../layout/Navbar";
import UserLayout from "../../layout/UserLayout";
import NotFoundPage from "../../../pages/PageNoutFound/PageNotFound";

// Lazy load user components
const Home = lazy(() => import("../../../pages/user/Home"));
const Signin = lazy(() => import("../../../pages/user/Signin"));
const RoomListPage = lazy(() => import("../../../pages/user/RoomListPage"));
const ReservationStatusListPage = lazy(() =>
  import("../../../pages/user/ReservationStatusPage/ReservationsStatusPage")
);
const RoomDetail = lazy(() => import("../../../pages/user/RoomDetails"));
const Booking = lazy(() => import("../../../pages/user/Booking"));
const UserProfilePage = lazy(() => import("../../../pages/user/ProfilePage"));
const WishlistPage = lazy(() => import("../../../pages/user/WishlistPage"));
const VendorPage = lazy(() => import("../../../pages/user/HostPage"));

const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
      <Route path="/" element={<UserLayout />}>
        
        <Route path="/room-list" element={<RoomListPage />} />
        <Route
          path="/reservations-status"
          element={<ReservationStatusListPage />}
        />
        <Route path="/room-details/:roomId" element={<RoomDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/user-wishlist" element={<WishlistPage />} />
        <Route path="/host-page" element={<VendorPage />} />
      </Route>
      <Route path="/signin" element={<ProtectedRoute element={Signin} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
