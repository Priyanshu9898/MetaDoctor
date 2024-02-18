"use client";

import React, { FC, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";

const ImageInput: FC = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handlePredict = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const base64Image = await convertToBase64(image);

      const response = await axios.post("http://localhost:8080/predict", {
        image: base64Image,
      });

      // console.log(response);

      const res = response.data[0].image;

      // console.log(res);

      setPrediction(res);

      setLoading(false);

    } catch (error) {
      console.error("Error during prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          onChange={handleFileChange}
          type="file"
        />
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>

        {image && (
          <div className="grid grid-cols-2 gap-4 mt-6 w-full">
            <div className="flex flex-col items-center justify-center">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto"
                />
              )}
              <Button
                className="mt-2"
                gradientDuoTone="purpleToPink"
                // className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handlePredict}
                disabled={loading}
              >
                {loading ? "Predicting..." : "Predict"}
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-semibold">Prediction Result:</h3>
              {prediction ? <p className="text-xl color-gray">{prediction}</p> : <p>No prediction yet</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageInput;
