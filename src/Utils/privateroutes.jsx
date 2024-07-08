/** @format */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../Utils/utils_helpers";

const PrivateRoute = () => {
  const auth = true
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
