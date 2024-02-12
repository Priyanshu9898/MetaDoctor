"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SubMenuOpenState } from "@/constants/Auth";

const DashboardSidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const [subMenuOpen, setSubMenuOpen] = useState<SubMenuOpenState>({});

  const toggleSubMenu = (index: number) => {
    setSubMenuOpen({ ...subMenuOpen, [index]: !subMenuOpen[index] });
  };

  const pathname = usePathname();
  const sidebarVariants = {
    open: {
      width: "300px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      width: "75px",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const navItems = [
    {
      href: "/Dashboard",
      label: "Dashboard",
      imgSrc: "/Images/Sidebar/dashboard6.png",
    },
    {
      href: "/Dashboard/medicineRecommender",
      label: "Medicine Recommendation",
      imgSrc: "/Images/Sidebar/medicine_recommendation.png",
    },
    {
      href: "/Dashboard/OralDiseaseClassifier",
      label: "Oral Disease Detector",
      imgSrc: "/Images/Sidebar/Oral.png",
    },
    {
      href: "/Dashboard/KidneyDiseaseClassifier",
      label: "Kidney Disease Detector",
      imgSrc: "/Images/Sidebar/kidney.png",
    },
    {
      href: "/Dashboard/CancerDiseaseClassifier",
      label: "Cancer Disease Detector",
      imgSrc: "/Images/Sidebar/cancer.png",
    },
    {
      href: "/Dashboard/foodAdvisor",
      label: "Food Advisor",
      imgSrc: "/Images/Sidebar/calory2.png",
    },

    {
      href: "/Dashboard/careCompanion",
      label: "Care Companion",
      imgSrc: "/Images/Sidebar/bot.png",
    },
    // {
    //   href: "/Dashboard/contactUS",
    //   label: "Contact US",
    //   imgSrc: "/Images/Sidebar/contact2.png",
    // },
    {
      href: "/Dashboard/about",
      label: "About US",
      imgSrc: "/Images/Sidebar/about.png",
    },
  ];

  const getItemClassName = (href: string) =>
    `flex items-center justify-${
      isCollapsed ? "center" : "start"
    } p-3 my-2 cursor-pointer hover:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors ${
      pathname === href
        ? "bg-blue-600 text-white dark:bg-blue-700"
        : "text-gray-900 hover:text-white dark:text-gray-200"
    }`;

  return (
    <motion.div
      initial={false}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      className="hidden md:flex flex-col top-0 left-0 h-full bg-white dark:bg-gray-900 transition-all duration-100 z-40 shadow-lg"
    >
      <nav className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={getItemClassName(item.href)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={item.imgSrc}
                    alt={item.label}
                    width={36}
                    height={36}
                  />
                </TooltipTrigger>
                {isCollapsed && (
                  <>
                    <TooltipContent side="left">{item.label}</TooltipContent>
                  </>
                )}
              </Tooltip>
            </TooltipProvider>
            {!isCollapsed && (
              <span className="ml-4 text-sm font-semibold">{item.label}</span>
            )}
          </Link>
        ))}

        <div
          key={"logout"}
          className={`flex items-center justify-${
            isCollapsed ? "center" : "start"
          } p-3 my-2 cursor-pointer hover:bg-red-200 hover:text-gray-800 dark:hover:bg-red-200 rounded-lg transition-colors `}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={"/Images/Sidebar/logout.png"}
                  alt={"logout"}
                  width={36}
                  height={36}
                 
                />
              </TooltipTrigger>
              {isCollapsed && (
                <>
                  <TooltipContent side="left">Logout</TooltipContent>
                </>
              )}
            </Tooltip>
          </TooltipProvider>
          {!isCollapsed && (
            <span className="ml-4 text-sm font-semibold">{"Logout"}</span>
          )}
        </div>
      </nav>
    </motion.div>
  );
};

export default DashboardSidebar;
