import React from "react";
import Heading from "../../components/Heading";
import ImageInput from "../../components/ImageInput";

const FoodAdvisor = () => {
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
        <ImageInput type={"calory"} />
      </div>
    </>
  );
};

export default FoodAdvisor;
