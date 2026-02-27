import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { BookOutlined, HomeOutlined, TeamOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

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
    {
      key: "/books",
      label: (
        <NavLink to="/books">
          <BookOutlined className="mr-1" />
          Books
        </NavLink>
      ),
    },
    {
      key: "/students",
      label: (
        <NavLink to="/students">
          <TeamOutlined className="mr-1" />
          Students
        </NavLink>
      ),
    },
  ];

  return (
    <Header className="bg-white shadow-sm sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <span className="text-2xl font-bold">My App</span>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]} // 🔥 dynamic selection
          items={menuItems}
        />
      </div>
    </Header>
  );
};

export default Navbar;
