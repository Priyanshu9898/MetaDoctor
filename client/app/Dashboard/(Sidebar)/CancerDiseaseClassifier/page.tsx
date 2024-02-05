import React from 'react'
import Heading from '../../components/Heading'

const CancerDiseaseClassifier = () => {
  return (
    <>
      <Heading
        imageIcon={"/Images/Sidebar/cancer.png"}
        title={"Chest Cancer Detector"}
        description={"Upload Image and Find out the exact Disease."}
      />
    </>
  )
}

export default CancerDiseaseClassifier