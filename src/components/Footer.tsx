import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="container px-4 lg:px-10 py-4 lg:py-6">
      <div className="flex justify-center items-center">
        <p className="text-sm lg:text-base opacity-60 font-semibold">
          &copy; {new Date().getFullYear()} | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
