import React from "react";
import { NavLink } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { GiStoneBust } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward, IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const menuItems = [
  { key: "/dashboard", label: "Dashboard", icon: <MdDashboard /> },
  { key: "/students", label: "Students", icon: <PiStudentBold /> },
  { key: "/books", label: "Books", icon: <GiStoneBust /> },
];

const SideBar = ({ sidebarCollapsed, toggleSidebar, onLogoutClick }) => {
  return (
    <div
      className={`${
        sidebarCollapsed ? "w-20" : "w-72"
      } min-h-screen bg-white text-gray-800 duration-300 relative flex flex-col transition-all ease-in-out shadow-xl`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center shadow-lg shrink-0"></div>
          <span
            className={`text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent duration-300 transition-all ${
              sidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            My App
          </span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2 mt-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.key}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 transition-all duration-200 rounded-lg group hover:bg-gray-100 hover:shadow-md ${
                isActive
                  ? "bg-gray-200 border-l-4 border-blue-500"
                  : ""
              }`
            }
          >
            <span className="text-2xl text-blue-500 group-hover:text-blue-600 transition-colors">
              {item.icon}
            </span>
            <span
              className={`font-medium transition-all duration-300 ${
                sidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 transition-all duration-200 rounded-lg group hover:bg-gray-100 ${
              isActive ? "bg-gray-200" : ""
            }`
          }
        >
          <span className="text-2xl text-gray-500 group-hover:text-gray-700">
            <CgProfile />
          </span>
          <span
            className={`font-medium transition-all duration-300 ${
              sidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            My Profile
          </span>
        </NavLink>

        <button
          onClick={onLogoutClick}
          className="flex items-center gap-4 px-4 py-3 w-full text-left transition-all duration-200 rounded-lg group hover:bg-red-100 hover:text-red-600"
        >
          <span className="text-2xl text-gray-500 group-hover:text-red-500">
            <IoIosLogOut />
          </span>
          <span
            className={`font-medium transition-all duration-300 ${
              sidebarCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            Logout
          </span>
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 z-10"
      >
        {sidebarCollapsed ? (
          <IoIosArrowForward size={20} />
        ) : (
          <IoIosArrowBack size={20} />
        )}
      </button>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-50"></div>
    </div>
  );
};

export default SideBar;