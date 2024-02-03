import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { FC } from "react";

const DashboardSidebar = ({ isCollapsed }: { isCollapsed: Boolean }) => {
  return (
    <>
      <div
        className={`transition-all ease-in-out duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } hidden sm:flex flex-col dark:bg-gray-900 bg-gray-100 dark:text-gray-200 text-gray-800 h-full`}
      >
        <Link
          href="/"
          className="group flex items-center  p-4 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
        >
          <HomeIcon className="transition-transform duration-200 h-6 w-6 text-blue-500 dark:text-blue-400" />
          <span
            className={`ml-4 text-base font-medium transition-all duration-200 ${
              isCollapsed
                ? "opacity-0 overflow-hidden w-0"
                : "opacity-100 w-auto"
            }`}
          >
            Dashboard
          </span>
        </Link>
        {/* More links can be added here with similar structure */}
      </div>
    </>
  );
};

export default DashboardSidebar;
