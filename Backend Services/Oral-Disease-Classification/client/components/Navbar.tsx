import Link from "next/link";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <div className="flex w-screen py-4 px-6 overflow-x-clip items-center justify-between">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold no-underline bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Oral Disease Detector
        </Link>
      </div>
      <div>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
