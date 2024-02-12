import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

const HeroSection = () => {
  const { theme } = useTheme(); // Using useTheme hook to get the current theme
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 8, repeat: Infinity },
    });
  }, [controls]);

  const directGradient =
    theme === "dark"
      ? "linear-gradient(to right, #fde68a, #f87171)"
      : "linear-gradient(to right, #6ee7b7, #3b82f6)";

  return (
    <>
      <motion.div
        className="relative h-[60vh] flex flex-col justify-center items-center text-center bg-primary dark:bg-secondary overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* <motion.div animate={controls} className="absolute w-full h-full">
          <Image
            src="/Images/landingPage/back1.jpg"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </motion.div> */}

        <div className="z-10 px-6">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: directGradient }}
          >
            Transforming Healthcare with AI
          </h1>
          <p
            className="mt-4 text-xl bg-clip-text text-transparent"
            style={{ backgroundImage: directGradient }}
          >
            Experience next-generation medical diagnosis and treatment.
          </p>
          <Link
            href="/login"
            className={`mt-8 inline-block p-3 rounded-lg px-6 shadow-lg transform transition duration-300 ease-in-out hover:scale-110 focus:outline-none ${
              theme === "dark"
                ? "bg-gradient-to-br from-yellow-400 to-red-500 focus:ring-red-300"
                : "bg-gradient-to-br from-green-400 to-blue-500 focus:ring-blue-300"
            }`}
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;
