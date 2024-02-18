from src.mlclassifier import logger
from src.mlclassifier.pipeline.stage_01_data_ingestion import DataIngestionTrainingPipeline
from src.mlclassifier.config.configuration import ConfigurationManager
from src.mlclassifier.components.data_loader import DataLoader
from src.mlclassifier.components.model_training import ModelTraining
from src.mlclassifier.components.model_evaluation import ModelEvaluation

STAGE_NAME = "Data Ingestation"

try:
    logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
    obj = DataIngestionTrainingPipeline()
    obj.main()
    logger.info(
        f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")

except Exception as e:
    logger.exception(e)
    raise e


STAGE_NAME = "Data Loading and Processing"

try:
    logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
    config = ConfigurationManager()
    data_loader_config = config.get_data_loader_config()
    data_loader = DataLoader(config=data_loader_config)

    data, sym_des, precautions, workout, description, medications, diets = data_loader.loadDataset()

    X, Y, diseases_list, symptoms_dict = data_loader.processing(data)

    X_train, X_test, y_train, y_test = data_loader.splitDataset(X, Y)

    logger.info(
        f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")

except Exception as e:
    logger.exception(e)
    raise e


print(X_train, X_test, y_train, y_test)


STAGE_NAME = "Model Training"

try:
    logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")

    config = ConfigurationManager()
    model_training_config = config.get_model_training_config()
    output_directory = model_training_config.root_dir

    model_trainer = ModelTraining(
        X_train, X_test, y_train, y_test, output_directory)
    model_trainer.train_all_models()
    trained_models = model_trainer.get_trained_models()

    # Access individual models using their names and get their performance metrics
    for model_name, model_info in trained_models.items():
        print(f'{model_name} Accuracy: {model_info["accuracy"]}')
        print(f'{model_name} Precision: {model_info["precision"]}')
        print(f'{model_name} Recall: {model_info["recall"]}')
        print(f'{model_name} F1 Score: {model_info["f1_score"]}')

    model_trainer.save_confusion_matrices()

    logger.info(
        f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")

except Exception as e:
    logger.exception(e)
    raise e


STAGE_NAME = "Model Evaluation"

try:
    logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")

    config = ConfigurationManager()
    model_evaluation_config = config.get_model_evaluation_config()
    output_directory = model_evaluation_config.root_dir

    model_selector = ModelEvaluation(trained_models, output_directory)
    best_model = model_selector.get_best_model(metric='accuracy')

    if best_model:
        model_selector.save_best_model(best_model)

    logger.info(
        f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")

except Exception as e:
    logger.exception(e)
    raise e
