## Kidney Disease Classification
This project focuses on the classification of kidney diseases using deep learning and computer vision techniques. We have developed a complete pipeline encompassing data ingestion, transformation, model training, and evaluation. The project leverages technologies such as Next.js, TypeScript, TailwindCSS for the frontend, and Python, Flask, mlflow, DVC for the backend.

### Frontend URL: https://kidney-disease-classification.vercel.app/
### Backend URL: 
- (Model Notebooks can be found in Research Folder)
- (Model Results can be found in Results Folder)

## Features
- Comprehensive data processing and transformation pipeline.
- Multiple deep learning, Transformers and machine learning models for comparative analysis.
- Complete backend implementation in Flask with logging, custom exception handling, and class-based modular coding following OOPs principles.
- Frontend developed using Next.js, TailwindCSS, TypeScript and Shadcn.UI for a seamless user experience.

## Dataset Information

### Context
CT KIDNEY DATASET: Normal-Cyst-Tumor and Stone

### Content
The dataset comprises 12,446 unique data points, including 3,709 cyst, 5,077 normal, 1,377 stone, and 2,283 tumor findings. It was collected from PACS from various hospitals in Dhaka, Bangladesh. After thorough selection and anonymization processes, the images were converted to a lossless jpg format and verified by medical professionals.

### Dataset Link: https://www.kaggle.com/datasets/nazmul0087/ct-kidney-dataset-normal-cyst-tumor-and-stone/data

## Technology Stack
### Frontend:
- Nextjs 14
- TypeScript
- TailwindCSS
- Shadcn.UI
### Backend:
- Python
- DVC
- MLFlow
- Deep Learning & Computer Vision
- Transformers & HuggingFace
- Flask
- OOP Principles


## Models Trained
- TNT transformer
- DEIT transformer
- ConVIT transformer
- VIT Transformer
- ResNet50
- InceptionV3
- MobileNetV2
- DenseNet121
- Xception
- EfficientNet Series (B0 to B3)
- VGG16 and VGG19
- Traditional ML Models (Random Forest, SVM, KNN, Naive Bayes, Decision Tree, Logistic Regression, Gradient Boosting, AdaBoost, Extra Trees)
- Ensemble Methods (Hard Voting, Soft Voting, Stacking)


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

# How to run Backend?
### STEPS:

Clone the repository

```bash
git clone https://github.com/Prriyanshu9898/Kidney-Disease-Classification-Using-Deep-Learning.git
```
### STEP 01- Create a Python environment after opening the repository

```bash
cd Kidney-Disease-Classification-Using-Deep-Learning
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
### STEP 04- Run the Training Pipeline
```bash
python main.py
```

# How to run Frontend?
### STEP 01- Go to client
```bash
cd frontend
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

## MLflow

- [Documentation](https://mlflow.org/docs/latest/index.html)


##### cmd
- mlflow ui

### dagshub
[dagshub](https://dagshub.com/)


MLFLOW_TRACKING_URI=https://dagshub.com/Priyanshu9898/Kidney-Disease-Classification-Deep-Learning-Project.mlflow \
MLFLOW_TRACKING_USERNAME=Priyanshu9898 \
MLFLOW_TRACKING_PASSWORD=1dc505ed931b2af16eacead37f82f256c16d99fe \
python script.py

Run this to export as env variables:

```bash

export MLFLOW_TRACKING_URI=https://dagshub.com/Priyanshu9898/Kidney-Disease-Classification-Deep-Learning-Project.mlflow

export MLFLOW_TRACKING_USERNAME=Priyanshu9898 

export MLFLOW_TRACKING_PASSWORD=1dc505ed931b2af16eacead37f82f256c16d99fe

```

## Training Results

| Model               | Accuracy   | Precision   | Recall   | F1 Score   |
|:--------------------|:-----------|:------------|:---------|:-----------|
| Stacking            | 100.0%     | 100.0%      | 100.0%   | 100.0%     |
| K-Nearest Neighbors | 99.92%     | 99.88%      | 99.94%   | 99.91%     |
| Extra Trees         | 99.84%     | 99.9%       | 99.64%   | 99.77%     |
| ConVIT transformer  | 99.84%     | 99.9%       | 99.64%   | 99.77%     |
| Soft Voting         | 99.6%      | 99.74%      | 99.09%   | 99.4%      |
| InceptionV3         | 99.52%     | 99.52%      | 99.52%   | 99.52%     |
| Random Forest       | 99.44%     | 99.66%      | 98.85%   | 99.24%     |
| Hard Voting         | 99.36%     | 99.58%      | 98.6%    | 99.07%     |
| SVM                 | 99.28%     | 99.38%      | 98.79%   | 99.07%     |
| EfficientNetB3      | 98.96%     | 98.96%      | 98.96%   | 98.95%     |
| Xception            | 98.83%     | 98.88%      | 98.83%   | 98.82%     |
| EfficientNetB2      | 98.67%     | 98.69%      | 98.67%   | 98.67%     |
| Gradient Boosting   | 98.47%     | 98.53%      | 97.08%   | 97.75%     |
| TNT transformer     | 98.31%     | 98.31%      | 98.31%   | 98.31%     |
| EfficientNetB1      | 98.27%     | 98.31%      | 98.27%   | 98.26%     |
| Logistic Regression | 98.15%     | 97.68%      | 97.2%    | 97.42%     |
| VIT transformer     | 96.43%     | 96.3%       | 94.58%   | 95.33%     |
| ResNet50            | 96.26%     | 96.34%      | 96.26%   | 96.24%     |
| DEIT transformer    | 96.22%     | 96.22%      | 96.22%   | 96.22%     |
| DenseNet121         | 95.94%     | 95.96%      | 95.94%   | 95.87%     |
| MobileNetV2         | 95.42%     |  95.72% | 95.42% | 95.29% |
| EfficientNetB0 | 95.3% | 95.61% | 95.3% | 94.98% |
| Decision Tree | 92.77% | 90.63% | 91.3% | 90.95% |
| VGG16 | 91.68% | 91.83% | 91.68% | 91.43% |
| AdaBoost | 85.3% | 81.99% | 78.92% | 80.22% |
| VGG19 | 83.97% | 83.23% | 83.97% | 82.57% |
| Naive Bayes | 52.69% | 60.53% | 45.11% | 37.68% |


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
