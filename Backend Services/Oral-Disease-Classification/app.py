from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import torch
from torchvision import transforms
import timm
import logging
from OralDiseaseClassifier import logger
from OralDiseaseClassifier.components.model_training import ModelTrainer
from OralDiseaseClassifier.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline
from OralDiseaseClassifier.pipeline.stage_02_data_processing import DataPreparingPipeline
from OralDiseaseClassifier.pipeline.stage_03_model_training import ModelTrainingEvaluationPipeline
from PIL import Image
from io import BytesIO
import base64
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)

# Define allowed origins for CORS
allowed_origins = ["https://metadoctor.vercel.app/", "https://meta-doctor.vercel.app", "https://meta-doctor.vercel.app/", "https://metadoctor-git-main-priyanshumalaviya9210-gmailcom.vercel.app/",  "https://metadoctorhelper.vercel.app", "http://localhost:3000",
                   "http://127.0.0.1:3000", "https://metadoctorhelper.vercel.app", "https://metadoctor-priyanshumalaviya9210-gmailcom.vercel.app/", "https://meta-doctor.vercel.app", "https://meta-doctor-nwxeblfpx-priyanshumalaviya9210-gmailcom.vercel.app", "https://meta-doctor-git-main-priyanshumalaviya9210-gmailcom.vercel.app"]


SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


def run_data_preprocessing():
    # Run your data preprocessing pipeline here
    logger.info("Starting data preprocessing")
    obj = DataPreparingPipeline()
    dataset, train_loader, val_loader = obj.main()
    logger.info("Data preprocessing completed")
    return dataset, train_loader, val_loader


@app.route('/train', methods=['POST'])
@cross_origin(origins=allowed_origins)
def train_model():
    try:
        data = request.json
        model_name = data['model_name']

        # Run data preprocessing
        dataset, train_loader, val_loader = run_data_preprocessing()

        # Model training
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        class_names = ['calculus', 'caries', 'gingivitis',
                       'hypodontia', 'toothDiscoloration', 'ulcers']
        model_training_config = ModelTrainingEvaluationPipeline().main()

        trainer = ModelTrainer(model_name=model_name, config=model_training_config, num_classes=len(dataset.classes),
                               train_loader=train_loader, val_loader=val_loader, device=device, class_names=class_names)
        trainer.train(num_epochs=1)

        return jsonify({"message": f"Training for model {model_name} completed successfully."}), 200

    except Exception as e:
        logger.exception(f"Error during model training: {str(e)}")
        return jsonify({"error": str(e)}), 500


# Function to load the model (modify according to your needs)
def load_model(model_name, num_classes, device):
    model = timm.create_model(
        model_name, pretrained=False, num_classes=num_classes)
    model_path = f'best_model/{model_name}_oral_disease_classifier.pth'
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model

# Image preprocessing function (modify according to your model's requirements)


def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[
                             0.229, 0.224, 0.225]),
    ])
    return transform(image).unsqueeze(0)


@app.route('/predict', methods=['POST'])
@cross_origin(origins=allowed_origins)
def predict_image():
    try:
        data = request.json
        image_data = data['image']

        # Replace with your default model name
        model_name = data.get('model_name', 'efficientvit_b0')

        # Decode the image
        image = Image.open(
            BytesIO(base64.b64decode(image_data))).convert('RGB')

        # Preprocess the image
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        processed_image = preprocess_image(image).to(device)

        # Load the model
        num_classes = 6
        model = load_model(model_name, num_classes, device)

        classes = ['Calculus', 'Caries', 'Gingivitis',
                   'Hypodontia', 'Tooth Discoloration', 'Ulcers']

        # Predict
        with torch.no_grad():
            outputs = model(processed_image)
            _, predicted = torch.max(outputs, 1)
            prediction = predicted.item()

        # Return the prediction result
        return jsonify({"prediction": classes[prediction]}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
@cross_origin(origins=allowed_origins)
def index():
    return "<h1>Oral Disease Detector Backend</h1> <br /> Go to Swagger Docs: <a href='/swagger'>Link</a>"


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
