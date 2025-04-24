import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './router/router'
import './index.css'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
