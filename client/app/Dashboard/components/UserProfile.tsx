"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState, useDispatch } from "@/redux/store";
import { LogoutUser } from "@/redux/UserInfoSlice";

const UserProfile = () => {
  const router = useRouter();
  const { loading, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(LogoutUser());
    if (!isAuthenticated) {
      router.push("/");
    }
    else{
      router.push("/Dashboard");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2">
          <div className="grid gap-1">
            <Link
              href="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 rounded-md"
            >
              Profile
            </Link>

            <p
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-red-100  dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-gray-100 cursor-pointer transition-colors duration-200 rounded-md"
            >
              Logout
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default UserProfile;
