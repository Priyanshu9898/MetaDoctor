from OralDiseaseClassifier import logger
from OralDiseaseClassifier.components.model_training import ModelTrainer
from OralDiseaseClassifier.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline
from OralDiseaseClassifier.pipeline.stage_02_data_processing import DataPreparingPipeline
from src.OralDiseaseClassifier.pipeline.stage_03_model_training import ModelTrainingEvaluationPipeline
import torch


# STAGE_NAME = "Data Ingestation"

# try:
#     logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
#     obj = DataIngestionTrainingPipeline()
#     obj.main()
#     logger.info(
#         f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")

# except Exception as e:
#     logger.exception(e)
#     raise e

STAGE_NAME = "Data Processing and Preparation"

try:
    logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
    obj = DataPreparingPipeline()
    dataset, train_loader, val_loader = obj.main()
    print("Type of train_loader:", type(train_loader))
    logger.info(
        f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")
except Exception as e:
    logger.exception(e)
    raise e

STAGE_NAME = "Data Training and Evaluation"


try:
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

    logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
    obj = ModelTrainingEvaluationPipeline()
    model_training_config = obj.main()

    # print(model_training_config)

    class_names = ['calculus', 'caries', 'gingivitis',
                   'hypodontia', 'toothDiscoloration', 'ulcers']
    # Initialize and train the model
    trainer = ModelTrainer(model_name='efficientvit_b0', config=model_training_config, num_classes=len(
        dataset.classes), train_loader=train_loader, val_loader=val_loader, device=device, class_names=class_names)
    trainer.train(num_epochs=100)

    # Evaluate the model
    accuracy, precision, recall, f1 = trainer.evaluate()

    # Process the evaluation results
    print(
        f"Accuracy: {accuracy}, Precision: {precision}, Recall: {recall}, F1 Score: {f1}")

    # To train multiple models

    # model_names = [
    #     'efficientvit_l2', 'efficientvit_l3',
    #     'efficientvit_m1', 'efficientvit_m2',
    #     'efficientvit_m3', 'efficientvit_m4', 'efficientvit_m5'
    # ]

    # for model_name in model_names:
    #     logger.info(f"Training model: {model_name}")

    #     # Initialize and train the model
    #     trainer = ModelTrainer(model_name=model_name, config=model_training_config, num_classes=len(class_names),
    #                            train_loader=train_loader, val_loader=val_loader, device=device, class_names=class_names)
    #     trainer.train(num_epochs=100)

    #     # Evaluate the model
    #     accuracy, precision, recall, f1 = trainer.evaluate()

    #     # Process the evaluation results
    #     logger.info(
    #         f"Model: {model_name}, Accuracy: {accuracy}, Precision: {precision}, Recall: {recall}, F1 Score: {f1}")
    logger.info(
        f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")
except Exception as e:
    logger.exception(e)
    raise e
