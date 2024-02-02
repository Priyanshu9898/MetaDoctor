"use client";

import React, { FC } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const ThemeSwitcher: FC = () => {
  const { theme, setTheme } = useTheme();

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:focus:ring-blue-300 from-pink-500 to-orange-500 focus:ring-pink-300"
      >
        {theme === "light" ? (
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
