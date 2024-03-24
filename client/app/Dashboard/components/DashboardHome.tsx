
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const navItems = [
    {
      href: "/BookAppointment",
      label: "Book an Appointment",
      imgSrc: "/Images/Sidebar/appointment.png",
    },
    
    {
      href: "/Dashboard/medicineRecommender",
      label: "Medicine Recommendation System",
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
   
  ];

  

  return (
    <>
      <div className="p-4 h-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 w-full">
        <div className="p-4 rounded-lg ">
          <section className=" py-2">
            <div className="px-4 mx-auto text-center">
              <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Explore the Power of AI in HealthCare
              </h1>
              <p className="mb-8 text-sm font-normal text-gray-500 lg:text-lg sm:px-16 lg:px-48 dark:text-gray-400">
                Complete Various Tasks with Our Powerful AI
              </p>
            </div>
          </section>

          <div className="flex flex-col items-center justify-center w-full">
            {navItems.map((item, index) => {
              return (
                <div key={index} className="w-full flex items-center justify-center">
                  <Link
                    href={item.href}
                    className="shadow-md mt-3 mb-2 cursor-pointer inline-flex items-center justify-between w-full md:w-[60%] p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:shadow-gray-950 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <div className="flex gap-x-4">
                      <Image
                        src={item.imgSrc}
                        alt={item.label}
                        width={24}
                        height={24}
                      />
                      <span className="w-full">{item.label}</span>
                    </div>
                    <div>
                      <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
