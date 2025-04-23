import React, { useState } from "react";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { menuRoutes } from "../../router/router";

export const SideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <nav
      className={`
              fixed sm:static z-50 top-0 left-0 h-full min-w-[250px] bg-gradient-to-b from-[#4f6378] to-[#26282b]
              pl-5 py-5 transition-transform duration-300 ease-in-out
              ${
                isSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full sm:translate-x-0"
              }
            `}
    >
      {/* Close button on mobile */}
      <div className="sm:hidden flex justify-end pr-3 mb-4 absolute top-2 right-1 z-10">
        <button
          className="text-white text-2xl hover:text-red-400 transition cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✕
        </button>
      </div>

      <h1 className="font-bold text-2xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent animate-pulse">
        Albert's Phones
      </h1>
      <span className="text-lg text-white">Bienvenido</span>

      <div className="border-gray-700 border my-3" />

      <div className="flex flex-col gap-2">
        {menuRoutes.map((route, index) => (
          <SidebarMenuItem key={index} item={route} />
        ))}
      </div>
    </nav>
  );
};
