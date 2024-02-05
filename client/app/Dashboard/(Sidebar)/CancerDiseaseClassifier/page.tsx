import React from 'react'
import Heading from '../../components/Heading'
import ImageInput from '../../components/ImageInput'

const CancerDiseaseClassifier = () => {
  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/cancer.png"}
        title={"Chest Cancer Detector"}
        description={"Upload Image and Find out the exact Disease."}
      />
      <div className="md:p-10 mt-4 md:mt-0">
        <ImageInput type={"cancer"} />
      </div>
    </>
  )
}

export default CancerDiseaseClassifier