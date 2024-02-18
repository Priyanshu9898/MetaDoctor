"use client";

import React from "react";
import { Navbar } from "flowbite-react";
import Image from "next/image";
import ThemeSwitcher from "./ThemeButton";

const NavbarComponent = () => {
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <Image
            src="/logo.jpg"
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
            width={40}
            height={100}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kidney Disease Classification
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <ThemeSwitcher />
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
