"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };
  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1 },
  };
  return (
    <>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
             <motion.div
              className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Image
                alt=""
                src="/Images/BookAppointment/hero3.jpg"
                // layout="fill"
                width={800}
                height={800}
                // objectFit="cover"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>

            <div className="lg:py-24">
              <motion.h2
                className="text-3xl font-bold sm:text-4xl"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Find & Book Appointment with your Fav Doctors
              </motion.h2>

              <motion.p
                className="mt-4 text-gray-600"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Searching for the right healthcare provider no longer needs to
                be a hassle. Our platform connects you with top-rated doctors
                and specialists to ensure your health concerns are addressed
                with care and precision. Book your appointment effortlessly and
                manage your healthcare journey online.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  href="/BookAppointment"
                  className="mt-8 inline-block rounded gradient-button px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Started Today
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
