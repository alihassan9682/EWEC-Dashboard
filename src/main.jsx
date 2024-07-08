/** @format */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import App from "./pages/App.jsx";
import Dashboard from "./container/dashboardPages/dashboard/admin/admin.jsx";
import Users from "./container/dashboardPages/users/users.jsx";
import Datagroups from "./container/dashboardPages/dataGroups/datagoups.jsx";
import Companies from "./container/dashboardPages/companies/companies.jsx";
import BusinessUnits from "./container/dashboardPages/businessUnits/businessUnits.jsx"
import Sites from "./container/dashboardPages/sites/sites.jsx"
import InspectionPoints from "./container/dashboardPages/inspectionPoints/inspectionPoints.jsx";
import Auth from "./auth/auth.jsx";
import Login from "./auth/login.jsx";
import "./index.scss";
import ScrollToTop from "./components/ui/scrolltotop.jsx";
import PrivateRoute from "./Utils/privateroutes.jsx";
import Loader from "./components/common/loader/loader.jsx";
import { isAuthenticated } from "./Utils/utils_helpers.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="dashboard" />
              ) : (
                <Navigate to="login" />
              )
            }
          />
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<App />}>
            <Route element={<PrivateRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="datagroups" element={<Datagroups />} />
              <Route path="companies" element={<Companies />} />
              <Route path="sites" element={<Sites />} />
              <Route path="business-units" element={<BusinessUnits />} />
              <Route path="inspection-points" element={<InspectionPoints />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);
