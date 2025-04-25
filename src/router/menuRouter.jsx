import React from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AuthPage, PhonesPage, UsersPage, SoldPhonesPage } from "../pages";
import { ProtectedRoute } from "../pages/dashboard/ProtectedRoute";
import { useAuthProvider } from "../context/AuthContext";
import { RedirectIfAuthenticated } from "../components/pages/RedirectIfAuthenticated";

export const menuRoutes = [
  {
    to: "/phones",
    icon: "fa-solid fa-mobile-screen-button", // Ícono de celular
    title: "Celulares",
    description: "Manejo de celulares",
    component: <PhonesPage />,
  },
  {
    to: "/soldphones",
    icon: "fa-solid fa-cart-arrow-down", // Ícono de venta
    title: "Celulares vendidos",
    description: "Chequeo de celulares vendidos",
    component: <SoldPhonesPage />,
  },
  {
    to: "/users",
    icon: "fa-solid fa-users", // Ícono de usuarios
    title: "Usuarios",
    description: "Manejo de usuarios",
    component: <UsersPage />
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    action: () => console.log("action"),
    element: <ProtectedRoute />,
    children: [
      ...menuRoutes.map((route, index) => ({
        key: index,
        path: route.to,
        element: route.component,
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to} />,
      },
    ],
  },
  {
    path: "signin",
    element: <RedirectIfAuthenticated />,
  },
]);