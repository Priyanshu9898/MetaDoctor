import React from "react";
import Heading from "../../components/Heading";

const FoodAdvisor = () => {
  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/calory2.png"}
        title={"Food Advisor"}
        description={
          "Upload Image of Your food to get the exact percentage of calory."
        }
      />
    </>
  );
};

export default FoodAdvisor;
