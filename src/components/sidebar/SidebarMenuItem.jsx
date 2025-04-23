import React from "react";
import { NavLink } from "react-router";

export const SidebarMenuItem = ({ item }) => {
  return (
    <NavLink
      key={item.to}
      to={item.to}
      className={({isActive}) =>
        `flex flex-row items-center gap-3 text-lg font-semibold text-gray-300 hover:text-white py-2 px-3 rounded-l-xl transition-all duration-200 ${
          isActive ? "bg-gray-900" : ""
        }`
      }
    >
      <i className={`${item.icon} text-2xl`} />
      
      <div className="flex flex-col gap-0">
        <span className="text-white"> {item.title}</span>
        <span className="text-xs text-gray-500">{item.description}</span>
      </div>
    </NavLink>
  );
};
