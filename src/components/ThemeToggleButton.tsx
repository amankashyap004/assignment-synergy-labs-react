import React from "react";
import { useTheme } from "../contexts/ThemeProvider";

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer font-semibold lg:text-lg"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggleButton;
