"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LogoutUser } from "@/redux/UserInfoSlice";
import { RootState, useDispatch } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SidebarMobile = () => {
  const pathname = usePathname();

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
    `flex items-center justify-start p-3 my-2 cursor-pointer hover:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors ${
      pathname === href
        ? "bg-blue-600 text-white dark:bg-blue-700"
        : "text-gray-900 hover:text-white dark:text-gray-200"
    }`;

  const router = useRouter();
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(LogoutUser());
    if (!isAuthenticated) {
      router.push("/");
    } else {
      router.push("/Dashboard");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <div className="grid gap-2 py-0">
        <nav className="flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <SheetClose asChild>
              <Link
                href={item.href}
                key={item.label}
                className={getItemClassName(item.href)}
              >
                <Image
                  src={item.imgSrc}
                  alt={item.label}
                  width={36}
                  height={36}
                />

                <span className="ml-4 text-sm font-semibold">{item.label}</span>
              </Link>
            </SheetClose>
          ))}

          <div
            key={"logout"}
            onClick={handleLogout}
            className={`flex items-center justify-start p-3 my-2 cursor-pointer hover:bg-red-200 hover:text-gray-800 dark:hover:bg-red-200 rounded-lg transition-colors `}
          >
            <Image
              src={"/Images/Sidebar/logout.png"}
              alt={"logout"}
              width={36}
              height={36}
            />

            <span className="ml-4 text-sm font-semibold" >
              {"Logout"}
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarMobile;
