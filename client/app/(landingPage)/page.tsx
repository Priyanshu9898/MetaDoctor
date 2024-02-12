"use client";

import React, { useEffect } from "react";
import LandingNavbar from "./components/LandingNavbar";
import Head from "next/head";
import { useSelector } from "react-redux";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

const LandingPage = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 8, repeat: Infinity },
    });
  }, [controls]);

  const textAnimation = {
    offscreen: { y: 30, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
  };

  return (
    <>
      <LandingNavbar />

      <div className="overflow-hidden">
        <HeroSection />

        <Services />

        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
