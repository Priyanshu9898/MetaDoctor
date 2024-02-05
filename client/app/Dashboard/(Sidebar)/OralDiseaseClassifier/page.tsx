import React from "react";
import Heading from "../../components/Heading";
import ImageInput from "../../components/ImageInput";

const OralDiseaseClassifier = () => {
  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/Oral.png"}
        title={"Oral Disease Detector"}
        description={"Upload Image and Find out the exact Disease."}
      />
      <div className="md:p-10 mt-4 md:mt-0">
        <ImageInput type={"oral"} />
      </div>
    </>
  );
};

export default OralDiseaseClassifier;
