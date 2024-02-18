# Oral-Disease-Classification

Oral Disease Classification is an advanced AI-driven application aimed at identifying various oral diseases through image analysis. Utilizing state-of-the-art deep learning and computer vision techniques, this tool serves as a significant aid in dental diagnostics.

### Frontend URL: https://oral-disease-classification.vercel.app/
### Backend URL: https://oraldiseasedetector.onrender.com
(Note: Use Train route only on the local system)

## About Dataset
Dental Condition Dataset
The Dental Condition Dataset is a comprehensive collection of images specifically curated for dental research and analysis. This dataset encompasses a wide range of dental conditions, including caries, calculus, gingivitis, tooth discolouration, ulcers, and hypodontia. It serves as a valuable resource for dental professionals, researchers, and machine learning enthusiasts interested in developing and training models for dental condition detection and classification.

### Dataset Details
- Image Categories: The dataset consists of carefully annotated images classified into various dental conditions:
- Caries: Images showing tooth decay, cavities, or carious lesions.
- Calculus: Images depicting dental calculus or tartar buildup on teeth.
- Gingivitis: Images displaying inflamed or infected gums.
- Tooth Discoloration: Images showcasing tooth discolouration or staining.
- Ulcers: Images exhibiting oral ulcers or canker sores.
- Hypodontia: Images representing the condition of missing one or more teeth.
- Image Sources: The dataset is a compilation of images sourced from multiple hospitals and reputable dental websites. These sources ensure the diversity and authenticity of the dental conditions depicted in the dataset.
- Annotation and Augmentation: Each image in the dataset is meticulously annotated with bounding boxes, accurately delineating the specific dental condition present. Furthermore, data augmentation techniques have been applied to enhance the dataset's diversity and generalization capabilities, including rotation, flipping, scaling, and noise addition.

### Dataset Link: https://drive.google.com/file/d/13NFWEqtL_3Vxsr02ehXoYTapp63dMIDM/view?usp=drive_link

## Features
- **Image-Based Disease Detection**: Users can upload images of oral conditions, and the system will classify the disease.
- **Deep Learning Integration**: Incorporates advanced models for accurate predictions.
- **Interactive Frontend**: Easy-to-use interface with immediate feedback.

## Workflows

1. Update config.yaml
2. Update secrets.yaml [Optional]
3. Update params.yaml
4. Update the entity
5. Update the configuration manager in src config
6. Update the components
7. Update the pipeline 
8. Update the main.py
9. Update the dvc.yaml
10. app.py

## Technology Stack
### Frontend:
- Nextjs 13
- TypeScript
- TailwindCSS
### Backend:
- Python
- DVC
- Deep Learning & Computer Vision
- Transformers & HuggingFace
- Flask
- OOP Principles

## Installation
    To install and run the App locally, follow these steps:
    
# How to run Backend?
### STEPS:

Clone the repository

```bash
git clone https://github.com/Priyanshu9898/Oral-Disease-Classification.git
```
### STEP 01- Create a Python environment after opening the repository
```bash
cd Oral-Disease-Classification
```

```bash
python -m venv env
```

```bash
env\Scripts\activate
```


### STEP 02- install the requirements
```bash
pip install -r requirements.txt
```

### STEP 03- Run the Flask Backend
```bash
python app.py
```

# How to run Frontend?
### STEP 01- Go to client
```bash
cd client
```
### STEP 02- install the requirements
```bash
npm install
```

### STEP 03- Run the NextJS frontend
```bash
npm run dev
```

### STEP 04- Build the frontend
```bash
npm run build
```


### DVC cmd

1. dvc init
2. dvc repro
3. dvc dag

### to run train pipeline
### step 01 - download the dataset and add extract it like this:
```bash
mkdir artifacts
cd artifacts
mkdir data_ingestion
cd data_ingestion
mkdir dataset
```
extract all 6 data class folders inside dataset


DVC 

 - Its very lite weight for POC only
 - lite weight expriements tracker
 - It can perform Orchestration (Creating Pipelines)

# Oral Disease Detector Backend API Endpoints

This document outlines the API endpoints for the Oral Disease Detector backend.

| Endpoint  | Method | Description                                           | Request Body Example                                                          | Success Response Example                          | Error Response Example             |
|-----------|--------|-------------------------------------------------------|-------------------------------------------------------------------------------|---------------------------------------------------|------------------------------------|
| `/train`  | POST   | Triggers the training of the model with parameters.   | `{ "model_name": "name_of_the_model" }`                                      | `{ "message": "Training for model [model_name] completed successfully." }` | `{ "error": "Error message" }`     |
| `/predict`| POST   | Predicts the oral disease from the provided image.    | `{ "image": "base64_encoded_image", "model_name": "optional_model_name" }`   | `{ "prediction": "predicted_class" }`             | `{ "error": "Error message" }`     |
| `/`       | GET    | Provides a link to Swagger documentation.             | N/A                                                                           | HTML content.                                     | N/A                                |

## Swagger UI

- **URL:** `/swagger`
- Provides an interactive user interface for testing and understanding the API endpoints.

## Notes

- All POST endpoints support cross-origin requests from specified origins.
- The backend is configured to run on host `0.0.0.0` and port `5000`.
- Ensure that the request body for POST methods is in JSON format.


## Training Results

| Model             | Accuracy   | Precision   | Recall   | F1 Score   | 
|:------------------|:-----------|:------------|:---------|:-----------|
| InceptionResnetV2 | 92.54%     | 91.06%      | 91.85%   | 91.32%     | 
| efficientvit_m2   | 92.37%     | 91.74%      | 92.02%   | 91.74%     |  
| efficientvit_m5   | 92.28%     | 92.15%      | 90.41%   | 90.80%     | 
| EfficientNetB2    | 92.10%     | 92.39%      | 92.10%   | 92.21%     | 
| efficientvit_b0   | 91.94%     | 90.54%      | 90.72%   | 90.61%     | 
| efficientvit_m4   | 91.94%     | 91.42%      | 90.20%   | 90.53%     | 
| EfficientNetB1    | 91.89%     | 91.84%      | 91.89%   | 91.73%     | 
| efficientvit_b2   | 91.85%     | 91.24%      | 90.03%   | 90.48%     |  
| efficientvit_b1   | 91.60%     | 91.80%      | 88.84%   | 89.65%     |  
| efficientvit_m1   | 91.34%     | 90.84%      | 89.73%   | 90.12%     |  
| EfficientNetB3    | 91.20%     | 91.24%      | 91.20%   | 91.19%     |  
| efficientvit_b3   | 90.99%     | 89.54%      | 90.31%   | 89.82%     |   
| EfficientNetB0    | 90.82%     | 90.87%      | 90.82%   | 90.43%     |  
| efficientvit_l1   | 90.65%     | 89.44%      | 89.80%   | 89.55%     | 
| efficientvit_l2   | 90.57%     | 91.41%      | 88.32%   | 88.92%     |  
| efficientvit_l3   | 90.48%     | 89.50%      | 90.01%   | 89.69%     |  
| DenseNet121       | 89.61%     | 89.71%      | 89.61%   | 89.57%     |   
| efficientvit_m3   | 89.54%     | 89.08%      | 88.69%   | 88.82%     |   
| MobileNetV2       | 89.44%     | 89.78%      | 89.44%   | 89.57%     |
| EfficientNetB4    | 89.40%     | 89.38%      | 89.40%   | 89.24%     |  
| EfficientNetB3    | 87.34%     | 87.71%      | 87.34%   | 87.34%     |
| DEIT              | 87.25%     | 86.24%      | 85.23%   | 85.64%     | 
| EfficientNetB5    | 86.78%     | 87.53%      | 86.78%   | 86.94%     |
| InceptionV3       |  84.29%  |   84.71%  | 84.29% |  84.47%  | 
| ResNet50          |  82.70%  |   82.80%  | 82.70% |  82.19%  |  
| CrossViT          |  79.45%  |   78.91%  | 77.60% |  78.09%  | 
| TNTTransformer    |  76.36%  |   75.06%  | 73.25% |  73.81%  |  
| ViTClassifier     |  75.63%  |   75.72%  | 74.56% |  74.94%  |   
| VGG16             |  64.46%  |   62.10%  | 64.46% |  61.19%  |  
| VGG19             |  50.30%  |   48.91%  | 50.30% |  44.24%  | 

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://priyanshumalaviya.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/priyanshumalaviya/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Priyanshu2281)
[![Medium](https://img.shields.io/badge/medum-1DA1F2?style=for-the-badge&logo=medium&logoColor=black)](https://medium.com/@priyanshumalaviya9210)
## Demo

Insert gif or link to demo


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## License
