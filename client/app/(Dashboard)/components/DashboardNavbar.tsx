"use client";

import React from "react";
import ThemeSwitcher from "@/components/Themes/ThemeSwitcher";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardNavbarProps } from "@/constants";
import UserProfile from "./UserProfile";



const DashboardNavbar = ({ toggleSidebar }: DashboardNavbarProps) => {
  return (
    <nav className="flex w-full border-b border-gray-200 dark:border-gray-700">
      <div className="flex w-screen px-6 py-4 items-center justify-between overflow-x-clip">
        <div className="flex items-center justify-between gap-6">
          <Button
            id="sidebar-dashboard"
            onClick={toggleSidebar}
            className="p-3 rounded-full bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:focus:ring-blue-300 from-pink-500 to-orange-500 focus:ring-pink-300 hidden md:flex"
          >
            <HamburgerMenuIcon style={{ color: "white" }} />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="p-3 rounded-full bg-gradient-to-br dark:from-blue-500 dark:to-purple-600 shadow-lg transform transition duration-300 ease-in-out hover:scale-110 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 dark:focus:ring-blue-300 from-pink-500 to-orange-500 focus:ring-pink-300 md:hidden">
                <HamburgerMenuIcon style={{ color: "white" }} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <h6 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Meta Doctor
            </h6>
          </Link>
        </div>
        <div className="flex flex-row justify-between items-center gap-4">
          <ThemeSwitcher />
          <UserProfile />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
