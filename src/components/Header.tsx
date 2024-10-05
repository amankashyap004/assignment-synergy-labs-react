import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center fixed w-full">
      <div>
        <p className="text-sm lg:text-2xl font-semibold">User Management App</p>
      </div>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
