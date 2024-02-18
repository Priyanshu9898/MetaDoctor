from OralDiseaseClassifier.config.configuration import ConfigurationManager
from OralDiseaseClassifier import logger
import torch

STAGE_NAME = "Data Training and Evaluation"


class ModelTrainingEvaluationPipeline:
    def __init__(self):
        pass

    def main(self):
    
        config = ConfigurationManager()
        model_training_config = config.get_model_training_config()

        return model_training_config


if __name__ == '__main__':
    try:
        logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
        obj = ModelTrainingEvaluationPipeline()
        model_training_config = obj.main()
        logger.info(
            f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")
    except Exception as e:
        logger.exception(e)
        raise e
