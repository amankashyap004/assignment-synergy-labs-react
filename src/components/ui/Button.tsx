import React from "react";

interface ButtonProps {
  title: string;
  extraClass: string;
}

const Button: React.FC<ButtonProps> = ({ title, extraClass }) => {
  return (
    <button
      type="button"
      className={`text-white font-medium rounded-full px-5 py-2.5 text-center bg- hover:bg-opacity-80 outline-none ${extraClass}`}
    >
      {title}
    </button>
  );
};

export default Button;
