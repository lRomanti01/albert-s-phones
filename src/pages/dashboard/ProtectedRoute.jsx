import React from "react";
import { Navigate, Outlet } from "react-router";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // o "user", según tu lógica

//   return isAuthenticated ? (
//     <DashboardLayout />
//   ) : (
//     <Navigate to="/signin" replace />
//   );\

return <DashboardLayout />
};
