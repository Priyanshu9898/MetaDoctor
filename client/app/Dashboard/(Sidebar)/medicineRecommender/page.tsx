import React from "react";
import InputSymptoms from "./Components/InputSymptoms";
import Heading from "../../components/Heading";

const medicineRecommender = () => {
  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/medicine_recommendation.png"}
        title={"Medicine Recommender"}
        description={
          "Enter Your Symptoms and Get the accurate Disease and its Cure."
        }
      />
      <div className="md:p-10 mt-4 md:mt-0">
        <InputSymptoms />
      </div>
    </>
  );
};

export default medicineRecommender;
