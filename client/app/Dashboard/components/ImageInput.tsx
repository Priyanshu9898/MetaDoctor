"use client";

import { Button } from "@/components/ui/button";
import {
  CALORY_DETECTOR,
  CANCER_DISEASE_API,
  KIDNEY_DISEASE_API,
  ORAL_DISEASE_API,
} from "@/utils/APIs/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Image from "next/image";

import React, { useState } from "react";

const ImageInput = ({ type }: { type: string }) => {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

      let url = "";
      if (type === "kidney") {
        url = KIDNEY_DISEASE_API;
      } else if (type === "oral") {
        url = ORAL_DISEASE_API;
      } else if (type === "cancer") {
        url = CANCER_DISEASE_API;
      } else if (type === "calory") {
        url = CALORY_DETECTOR;
      } else {
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.post(url, {
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
    <div className="container mx-auto p-4 dark:bg-gray-800 w-[100%]">
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
              <Image
                src={image}
                alt="Preview"
                width={500}
                height={400}
                className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
              />
              <Button
                onClick={handlePredict}
                disabled={isLoading}
                className={`mt-4 px-6 py-2 rounded font-bold text-white transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none
              bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl
              dark:from-blue-500 dark:to-purple-600 dark:bg-gradient-to-br
              `}
              >
                {isLoading && (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  </>
                )}
                Predict
              </Button>
            </>
          )}
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Image
                src="/GIF/loading6.gif"
                alt="Loading..."
                width={200}
                height={200}
              />
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
