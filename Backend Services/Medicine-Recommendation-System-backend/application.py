from flask import Flask, request, jsonify
from flask_cors import cross_origin
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
from src.mlclassifier.config.configuration import ConfigurationManager
from src.mlclassifier.components.data_loader import DataLoader
from src.mlclassifier.components.prediction import Prediction
from src.mlclassifier.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline
from src.mlclassifier.components.model_training import ModelTraining
from src.mlclassifier.components.model_evaluation import ModelEvaluation
from src.mlclassifier import logger
from src.mlclassifier.pipeline.prediction_pipeline import PredictionPipeline
import pandas as pd
app = Flask(__name__)


# Define allowed origins for CORS
allowed_origins = ["http://localhost:3000",
                   "http://127.0.0.1:3000", "https://metadoctorhelper.vercel.app"]

CORS(app)

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

logger.info("Starting to load datasets.")


sym_des = pd.read_csv("symtoms_df.csv")
logger.info("Symptoms dataset loaded.")

precautions = pd.read_csv("precautions_df.csv")
logger.info("Precautions dataset loaded.")

workout = pd.read_csv("workout_df.csv")
logger.info("Workout dataset loaded.")

description = pd.read_csv("description.csv")
logger.info("Description dataset loaded.")

medications = pd.read_csv('medications.csv')
logger.info("Medications dataset loaded.")

diets = pd.read_csv("diets.csv")
logger.info("Diets dataset loaded.")

data = pd.read_csv("Training.csv")
logger.info("Training dataset loaded.")


@app.route('/predict', methods=['POST'])
@cross_origin(origins=allowed_origins)
def predict():
    try:
        input_data = request.json

        # description, precautions, medications, diets, workout, data, sym_des

        print(input_data)
        input_symptoms = input_data.get('symptoms', [])

        # Initialize the PredictionPipeline
        prediction_pipeline = PredictionPipeline(symptoms=input_symptoms, description=description, precautions=precautions,
                                                 medications=medications, diets=diets, workout=workout, data=data, sym_des=sym_des)
        results = prediction_pipeline.main()

        # print(type(results['Workout']))

        # print((results))

        return jsonify(results), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/')
@cross_origin(origins=allowed_origins)
def index():
    return "<h1>Medicine Recommendation System Backend</h1> <br /> Go to Swagger Docs: <a href='/swagger'>Link</a>"


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
