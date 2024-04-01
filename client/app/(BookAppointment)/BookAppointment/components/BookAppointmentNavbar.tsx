"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


const NavbarComponent = () => {
  const pathname = usePathname();

  const isActive = (currPage: string) => pathname === currPage;

  return (
    <nav className="w-full h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-16">
      {/* Logo */}
      <Link href="/" className="text-2xl md:text-4xl font-bold gradient-text">
        MetaDoctor
      </Link>

      {/* Navigation Items */}
      <div className="hidden md:flex flex-grow items-center justify-center gap-x-6 lg:gap-x-10 text-[#828d9c] font-semibold">
        <Link
          href="/"
          className={`hover-link ${isActive("/") ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          href="/contact"
          className={`hover-link ${isActive("/contact") ? "active" : ""}`}
        >
          Contact
        </Link>
        <Link
          href="/invest"
          className={`hover-link ${isActive("/invest") ? "active" : ""}`}
        >
          Invest
        </Link>
        <Link
          href="https://wellfound.com/company/omnisynkai"
          className={`hover-link ${isActive("/about") ? "active" : ""}`}
        >
          Careers
        </Link>
      </div>

      {/* Button  */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:flex items-center hidden gradient-button"
      >
        <Button className="gradient-button">Request Demo</Button>
      </motion.div>
    </nav>
  );
};

export default NavbarComponent;
