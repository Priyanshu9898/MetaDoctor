"use client";

import React from "react";
import ThemeSwitcher from "@/components/Themes/ThemeSwitcher";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const LandingNavbar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/login");
  };

  const handleClickDashboard = () => {
    router.push("/Dashboard");
  };

  return (
    <nav className="flex w-full border-b border-gray-200 dark:border-gray-700">
      <div className="flex w-screen px-6 py-4 items-center justify-between overflow-x-clip">
        <div className="flex items-center justify-between gap-6">
          {/* <Link href="/">
            <h6 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Meta Doctor
            </h6>
          </Link> */}
          <Link href="/" className="text-2xl md:text-4xl font-bold gradient-text">
        MetaDoctor
      </Link>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <ThemeSwitcher />
          {isAuthenticated ? (
            <>
              <Button
                id="sidebar-dashboard"
                onClick={handleClickDashboard}
                className="p-3 rounded-lg px-6 bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:focus:ring-blue-300 from-pink-500 to-orange-500 focus:ring-pink-300 hidden md:flex"
              >
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button
                id="sidebar-dashboard"
                onClick={handleClickLogin}
                className="p-3 rounded-lg px-6 bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:focus:ring-blue-300 from-pink-500 to-orange-500 focus:ring-pink-300 hidden md:flex"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
