# Chest-Cancer-Classification
CT Scan Chest Cancer Classification using Deep learning, Transformers, mlflow, DVC,  AWS

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

# How to run?
### STEPS:

Clone the repository

```bash
git clone https://github.com/Prriyanshu9898/Chest-Cancer-Classification
```
### STEP 01- Create a Python environment after opening the repository

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

## MLflow

- [Documentation](https://mlflow.org/docs/latest/index.html)

- [MLflow tutorial](https://youtube.com/playlist?list=PLkz_y24mlSJZrqiZ4_cLUiP0CBN5wFmTb&si=zEp_C8zLHt1DzWKK)

##### cmd
- mlflow ui

### dagshub
[dagshub](https://dagshub.com/)

MLFLOW_TRACKING_URI=https://dagshub.com/Priyanshu9898/Chest-Cancer-Classification.mlflow \
MLFLOW_TRACKING_USERNAME=Priyanshu9898 \
MLFLOW_TRACKING_PASSWORD=1dc505ed931b2af16eacead37f82f256c16d99fe \
python script.py

Run this to export as env variables:

```bash

export MLFLOW_TRACKING_URI=https://dagshub.com/Priyanshu9898/Chest-Cancer-Classification.mlflow

export MLFLOW_TRACKING_USERNAME=Priyanshu9898 

export MLFLOW_TRACKING_PASSWORD=1dc505ed931b2af16eacead37f82f256c16d99fe

```



### DVC cmd

1. dvc init
2. dvc repro
3. dvc dag


## About MLflow & DVC

MLflow

 - Its Production Grade
 - Trace all of your expriements
 - Logging & taging your model


DVC 

 - Its very lite weight for POC only
 - lite weight expriements tracker
 - It can perform Orchestration (Creating Pipelines)
