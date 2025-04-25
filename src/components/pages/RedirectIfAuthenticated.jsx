import React from "react";
import { Navigate } from "react-router";
import { useAuthProvider } from "../../context/AuthContext";
import { AuthPage } from "../../pages/AuthPage";

export const RedirectIfAuthenticated = () => {
  const { session } = useAuthProvider();

  if (session) {
    return <Navigate to="/" replace />;
  }

  return <AuthPage />;
};
