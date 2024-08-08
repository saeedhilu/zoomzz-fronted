import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../../pages/vendor/Dashboard";


const VendorRoutes =()=>{
    return(
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}
export default VendorRoutes;