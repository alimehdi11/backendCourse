import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  PhoneOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const menuItems = [
    {
      key: "/",
      label: (
        <NavLink to="/" className="flex items-center">
          <HomeOutlined className="mr-1" />
          Home
        </NavLink>
      ),
    },
    { key: "/about", label: "About", icon: <InfoCircleOutlined /> },
    { key: "/contact", label: "Contact", icon: <PhoneOutlined /> },
  ];

  return (
    <Header className="bg-white shadow-sm sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent duration-300 transition-all">
          My App
        </div>
        <Menu
          mode="horizontal"
          className="border-0 flex-1 justify-center hidden md:flex"
          selectedKeys={["/"]}
          items={menuItems}
        />

        <div className="flex items-center space-x-4">
          <NavLink to="/auth/login">
            {({ isActive }) => (
              <Button
                type={isActive ? "primary" : "default"}
                icon={<LoginOutlined />}
                className={`flex items-center ${
                  isActive ? "" : "hover:border-blue-500 hover:text-blue-500"
                }`}
              >
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
          </NavLink>

          <NavLink to="/auth/signup">
            {({ isActive }) => (
              <Button
                type={isActive ? "primary" : "default"}
                icon={<UserAddOutlined />}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:opacity-90"
              >
                <span className="hidden sm:inline">Sign Up</span>
              </Button>
            )}
          </NavLink>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
