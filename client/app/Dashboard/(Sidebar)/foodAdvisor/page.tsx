"use client";

import React, { useState } from "react";
import Heading from "../../components/Heading";
import ImageInput from "../../components/ImageInput";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CALORY_DETECTOR } from "@/utils/APIs/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface MealPlanDay {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
}

interface WeeklyMealPlan {
  [key: string]: MealPlanDay;
}

const FoodAdvisor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [caloryItems, setCaloryItems] = useState([]);
  const [totalCalories, setTotalCalories] = useState("0");
  const [weeklyMealPlan, setWeeklyMealPlan] = useState<WeeklyMealPlan>({});

  const renderMealPlanDay = (day: string, mealPlanDay: MealPlanDay) => {
    return (
      <Card key={day} className="mt-6">
        
        
        <CardHeader>
          <CardTitle> {day}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-900 dark:text-gray-200">
            <strong>Breakfast:</strong> {mealPlanDay.breakfast}
          </p>
          <p className="text-gray-900 dark:text-gray-200">
            <strong>Lunch:</strong> {mealPlanDay.lunch}
          </p>
          <p className="text-gray-900 dark:text-gray-200">
            <strong>Dinner:</strong> {mealPlanDay.dinner}
          </p>
          <p className="text-gray-900 dark:text-gray-200">
            <strong>Snacks:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-900 dark:text-gray-200">
            {mealPlanDay.snacks.map((snack, index) => (
              <li key={index}>{snack}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage(reader.result);
          setImageMimeType(file.type);
        }
      };
    }
  };

  const handlePredict = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (image && imageMimeType) {
      // Check if both image and MIME type are available
      setIsLoading(true);

      try {
        const res = await axios.post(CALORY_DETECTOR, {
          image: image.split(",")[1], // Base64-encoded data
          mimeType: imageMimeType, // the MIME type
        });

        const data = JSON.parse(res.data.response);

        console.log(data);
        setCaloryItems(data.image_analysis.items);
        setTotalCalories(data.image_analysis.total_calories);
        setWeeklyMealPlan(data.weekly_meal_plan || {});
        setPrediction(res.data.response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in prediction:", error);
        setIsLoading(false);
      }
    } else {
      console.error("No image to predict or MIME type is missing");
    }
  };

  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/calory2.png"}
        title={"Food Advisor"}
        description={
          "Upload Image of Your food to get the exact percentage of calory in your food."
        }
      />
      <div className="md:p-10 mt-4 md:mt-0">
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
                  <>
                    {/* Displaying the Prediction */}
                    <div className="p-4 border bg-white dark:bg-gray-700 rounded shadow-sm">
                      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Total Calories: {totalCalories}
                      </p>
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Food Items:
                        </h3>
                        {caloryItems.map((item: any, index) => (
                          <p
                            key={index}
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {item.name}: {item.calories} calories
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <Dialog>
                        <DialogTrigger>
                          <Button
                            className={`mt-4 px-6 py-2 rounded font-bold text-white transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none
              bg-gradient-to-br from-pink-500 to-orange-500 hover:bg-gradient-to-bl
              dark:from-blue-500 dark:to-purple-600 dark:bg-gradient-to-br
              hidden md:flex items-center align-center w-full`}
                          >
                            Weekly Meal Plan
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-300 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-600">
                          {/* Content here */}
                          <DialogHeader>
                            <DialogTitle>
                              Your Healthy Weekly Meal Plan
                            </DialogTitle>
                            <DialogDescription>
                              <div>
                                {Object.entries(weeklyMealPlan).map(
                                  ([day, mealPlanDay]) =>
                                    renderMealPlanDay(
                                      day,
                                      mealPlanDay as MealPlanDay
                                    )
                                )}
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="mt-6 md:hidden">
                      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Your Healthy Weekly Meal Plan
                      </h2>
                      <div>
                        {Object.entries(weeklyMealPlan).map(
                          ([day, mealPlanDay]) =>
                            renderMealPlanDay(day, mealPlanDay as MealPlanDay)
                        )}
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodAdvisor;
