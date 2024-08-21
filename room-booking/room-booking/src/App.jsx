import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/protectedrouted/ProtectedRoute";
import Spinner from "./components/Spinner/Spinner";
import RoleProtecterRoute from "./components/auth/protectedrouted/RoleProtecterRoute";
import UnauthorizedPage from "./components/unauthorized/UnauthorizedPage";
import AdminLoginPage from "./pages/admin/Login";
import AdminRoutes from "./components/routes/admin/AdminRoutes";
import SignupPage from "./pages/vendor/Signup";
import VendorRoutes from "./components/routes/vendor/VendorRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from "./components/routes/user/UserRoutes";
// Lazy load components




const Home = lazy(() => import("./pages/user/Home"));
const Signin = lazy(() => import("./pages/user/Signin"));
const RoomListPage = lazy(() => import("./pages/user/RoomListPage"));
const ReservationStatusListPage = lazy(() =>
  import("./pages/user/ReservationStatusPage/ReservationsStatusPage")
);
const RoomDetail = lazy(() => import("./pages/user/RoomDetails"));
const Booking = lazy(() => import("./pages/user/Booking"));
const UserProfilePage = lazy(() => import("./pages/user/ProfilePage"));
const WishlistPage = lazy(() => import("./pages/user/WishlistPage"));
const VendorPage = lazy(() => import("./pages/user/HostPage"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      
      <ToastContainer />
      <Routes>
        {/* Unauthorized users redirecting Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin Login Page */}

        {/* 
        
        ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ Admin Routes ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
        
        */}

        <Route path="admin/login" element={<AdminLoginPage />} />

        {/* Admin RoleProtected Pages */}
        <Route
          path="/admin/*"
          element={
            <RoleProtecterRoute allowedRoles={["superadmin"]}>
              <AdminRoutes />
            </RoleProtecterRoute>
          }
        />

        {/* 
        
        ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ Vendor Routes ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
        
        */}

        <Route path="/vendor-signup" element={<SignupPage />} />

        <Route
          path="/vendor/*"
          element={
            <RoleProtecterRoute allowedRoles={["vendor"]}>
              <VendorRoutes />
            </RoleProtecterRoute>
          }
        />

        {/* 
        
        ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ User Routes ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇
        
        */}
        {/* Regular routes */}
        <Route
          path="/*"
          element={
           
              <UserRoutes />
           
          }
        />
        {/* <Route path="/" element={<Home />} />
        <Route path="/signin" element={<ProtectedRoute element={Signin} />} />
        <Route path="/room-list" element={<RoomListPage />} />
        <Route
          path="/reservations-status"
          element={<ReservationStatusListPage />}
        />
        <Route path="/room-details/:roomId" element={<RoomDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/user-wishlist" element={<WishlistPage />} />
        <Route path="/host-page" element={<VendorPage />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
