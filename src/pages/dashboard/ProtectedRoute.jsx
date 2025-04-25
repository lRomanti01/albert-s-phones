import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthProvider } from "../../context/AuthContext";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const ProtectedRoute = () => {
  const { session } = useAuthProvider();
  const location = useLocation();

  if (!session) {
    // No está autenticado: redirige a /signin
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Usuario autenticado: puede continuar
  return <DashboardLayout />;
};
