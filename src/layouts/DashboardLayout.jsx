import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { SideBar } from "../components/sidebar/SideBar";
import { FiLogOut } from "react-icons/fi"; // ícono de logout
import { useAuthProvider } from "../context/AuthContext";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { removeSession } = useAuthProvider(); 

  const handleLogout = async () => {
    removeSession();
    navigate("/signin"); // Redirige al login
  };

  return (
    <main className="flex h-screen w-screen bg-gray-900 bg-opacity-10 overflow-x-auto relative">
      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content */}
      <section className="flex flex-col w-full h-screen bg-gray-900 bg-opacity-10 p-5 relative">
        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          className="absolute top-5 right-5 cursor-pointer flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
        >
          <FiLogOut size={20} />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>

        {/* Mobile menu button */}
        <div className="sm:hidden mb-4">
          <button
            className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰ Menú 
          </button>
        </div>

        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-5">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};
