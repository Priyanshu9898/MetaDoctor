import { Link } from "lucide-react";
import React from "react";

const DashboardHome = () => {
  return (
    <>
      <div className="p-4 sm:ml-64 h-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <div className="p-4 rounded-lg mt-14 ">
          <section className=" py-2">
            <div className=" px-4 mx-auto max-w-screen-xl text-center">
              <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Explore the Power of AI in HealthCare
              </h1>
              <p className="mb-8 text-sm font-normal text-gray-500 lg:text-lg sm:px-16 lg:px-48 dark:text-gray-400">
                Complete Various Tasks with Our Powerful AI
              </p>

             
            </div>
          </section>
        </div>
      </div>
      {/* <div className="p-4 sm:ml-64 dark:bg-gray-900 min-h-screen scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        <div className="p-4 rounded-lg mt-14 dark:bg-gray-900">
          <section className="bg-white dark:bg-gray-900 py-2">
            <div className=" px-4 mx-auto max-w-screen-xl text-center">
              <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                Explore the Power of AI in HealthCare
              </h1>
              <p className="mb-8 text-sm font-normal text-gray-500 lg:text-lg sm:px-16 lg:px-48 dark:text-gray-400">
                Complete Various Tasks with Our Powerful AI
              </p>
              <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                
              </div>
            </div>
          </section>
        </div>
      </div> */}
    </>
  );
};

export default DashboardHome;
