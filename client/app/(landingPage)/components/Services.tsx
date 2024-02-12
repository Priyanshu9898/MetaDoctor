import React from "react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      id: 1,
      name: "Kidney Disease Classification",
      description:
        "Utilize AI to accurately diagnose and classify kidney diseases.",
      icon: "/Images/Sidebar/kidney.png",
      alt: "Kidney Classification",
    },
    {
      id: 2,
      name: "Cancer Detection",
      description:
        "Advanced AI algorithms for early cancer detection and assessment.",
      icon: "/Images/Sidebar/cancer.png",
      alt: "Cancer Detection",
    },
    {
      id: 3,
      name: "Oral Disease Classification",
      description:
        "Innovative solutions for detecting and classifying oral diseases.",
      icon: "/Images/Sidebar/oral.png",
      alt: "Oral Disease Classification",
    },
    {
      id: 4,
      name: "Medicine Recommendation System",
      description:
        "Leverage our AI-driven platform to receive personalized medicine recommendations based on medical history and current health conditions, optimizing treatment outcomes.",
      icon: "/Images/Sidebar/medicine_recommendation.png",
      alt: "Medicine Recommendation",
    },
    {
      id: 5,
      name: "Food Advisor",
      description:
        "Discover nutritionally balanced meal plans tailored to your health goals and dietary preferences, all curated by our intelligent AI food advisor.",
      icon: "/Images/Sidebar/calory.png",
      alt: "Food Advisor",
    },
    {
      id: 6,
      name: "Care Companion AI Bot",
      description:
        "Experience 24/7 support with our AI Care Companion, offering guidance on health queries, reminders for medication, and emotional support, making healthcare more accessible.",
      icon: "/Images/Sidebar/bot.png",
      alt: "Care Companion",
    },
  ];

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  const hoverEffect = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  
  return (
    <>
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Our Services
            </h2>
            <p className="text-md text-gray-600 dark:text-gray-200">
              Explore how we can transform your healthcare experience with AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white dark:bg-gray-700 shadow-xl rounded-lg overflow-hidden"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="p-5 text-center">
                  <div className="flex justify-center">
                    <img
                      src={service.icon}
                      alt={service.alt}
                      className="w-20 h-20"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-4">
                    {service.name}
                  </h3>
                  <p className="text-md text-gray-600 dark:text-gray-200">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
