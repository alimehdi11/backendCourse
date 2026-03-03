import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useLocation } from "react-router-dom";

const TopBar = ({ onLogoutClick }) => {
  const { pathname } = useLocation();
  const name = pathname.split("/")[1];

  return (
    <div className="w-full h-18 bg-white text-gray-800 px-6 flex items-center justify-between shadow-md">
      {/* Page Title */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent duration-300 transition-all capitalize">
          {name}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        <button className="text-3xl text-gray-600 hover:text-blue-500 transition-colors">
          <CgProfile />
        </button>

        <button
          onClick={onLogoutClick}
          className="text-3xl text-gray-600 hover:text-red-500 transition-colors"
        >
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
