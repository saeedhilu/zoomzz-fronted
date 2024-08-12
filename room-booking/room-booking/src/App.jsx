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

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Signin"));
const RoomListPage = lazy(() => import("./pages/RoomListPage"));
const ReservationStatusListPage = lazy(() =>
  import("./pages/ReservationsStatusPage")
);
const RoomDetail = lazy(() => import("./pages/RoomDetails"));
const Booking = lazy(() => import("./pages/Booking"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const VendorPage = lazy(() => import("./pages/HostPage"));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
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
        <Route path="/" element={<Home />} />
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
        <Route path="/host-page" element={<VendorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
