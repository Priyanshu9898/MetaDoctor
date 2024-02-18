"use client";

import axios from "axios";
// import Image from "next/image";
import React, { useState } from "react";

const ImageInput = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
        }
      };
    }
  };

  const handlePredict = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (image) {
      setIsLoading(true);
      try {
        const res = await axios.post("https://oraldiseasedetector.onrender.com/predict", {
          image: image.split(",")[1],
        });
        setPrediction(res.data.prediction);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in prediction:", error);
        setIsLoading(false);
      }
    } else {
      console.error("No image to predict");
    }
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 w-[90%]">
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4
                     file:border-0 file:rounded file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                     dark:file:bg-gray-700 dark:file:text-gray-300 dark:hover:file:bg-gray-600"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col items-center">
          {image && (
            <>
              <img
                src={image}
                alt="Preview"
                className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
              />
              <button
                onClick={handlePredict}
                className="mt-4 px-6 py-2 rounded font-bold text-white transition duration-300
                           bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500
                           shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                style={{ alignSelf: "center" }}
              >
                Predict
              </button>
            </>
          )}
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              {/* <Image
                src="/Hourglass.gif"
                alt="Loading..."
                width={400}
                height={400}
              /> */}
            </div>
          ) : (
            prediction && (
              <div className="p-4 border bg-white dark:bg-gray-700 rounded shadow-sm">
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Prediction:
                </p>
                <p className="text-gray-600 dark:text-gray-400">{prediction}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
