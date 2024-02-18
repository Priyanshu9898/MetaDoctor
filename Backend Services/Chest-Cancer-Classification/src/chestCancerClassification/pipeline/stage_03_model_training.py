from chestCancerClassification.config.configuration import ConfigurationManager
from chestCancerClassification.components.model_training import Training
from chestCancerClassification import logger


STAGE_NAME = "Model Training Stage"


class TrainingPipeline:
    def __init__(self):
        pass

    def main(self):
        config = ConfigurationManager()
        
        # logger.info("Training start for CNN model")

        # training_config = config.get_training_config_cnn()

        # print(training_config)
        # training = Training(config=training_config, model_name="CNN")
        # training.train_cnn_model()

        # logger.info("Training ended successfully for CNN model")
        
        # logger.info("Training start for CNN Hyperparameter Tuning model")

        # training_config = config.get_training_config_cnn()

        # # print(training_config)
        # training = Training(config=training_config, model_name="CNN Hyperparameter Tuning")
        # # training.build_tunable_cnn_model()
        # best_model, best_hyperparameters = training.hyperparameter_tuning()
        # training.train_and_evaluate_best_model(best_model)

        # logger.info("Training ended successfully for CNN Hyperparameter Tuning model")
        

        logger.info("Training start for VGG16 model")

        training_config = config.get_training_config_vgg16()

        # print(training_config)
        # training = Training(config=training_config, model_name="VGG16")
        # training.train()

        # logger.info("Training ended successfully for VGG16 model")

        # logger.info("Training start for VGG19 model")

        # training_config = config.get_training_config_vgg19()

        # print("VGG19 Training Config", training_config)
        # logger.info("VGG19 Training Config", training_config)

        # training = Training(config=training_config, model_name="VGG19")
        # training.train()

        # logger.info("Training ended successfully for VGG19 model")

        logger.info("Training start for RESNET model")

        training_config = config.get_training_config_resnet()

        logger.info("RESNET Training Config", training_config)

        training = Training(config=training_config, model_name="RESNET")
        training.train()

        logger.info("Training ended successfully for RESNET model")

        logger.info("Training start for Inceptionv3 model")

        training_config = config.get_training_config_inceptionv3()

        logger.info("Inceptionv3 Training Config", training_config)

        training = Training(config=training_config, model_name="Inceptionv3")
        training.train()

        logger.info("Training ended successfully for Inceptionv3 model")

        logger.info("Training start for Xception model")

        training_config = config.get_training_config_xception()

        logger.info("Xception Training Config", training_config)

        training = Training(config=training_config, model_name="Xception")
        training.train()

        logger.info("Training ended successfully for Xception model")

        logger.info("Training start for Mobilenet model")

        training_config = config.get_training_config_mobilenet()

        logger.info("Mobilenet Training Config", training_config)

        training = Training(config=training_config, model_name="Mobilenet")
        training.train()

        logger.info("Training ended successfully for Mobilenet model")

        logger.info("Training start for MobilenetV2 model")

        training_config = config.get_training_config_mobilenetv2()

        logger.info("MobilenetV2 Training Config", training_config)

        training = Training(config=training_config, model_name="MobilenetV2")
        training.train()

        logger.info("Training ended successfully for MobilenetV2 model")


if __name__ == '__main__':
    try:
        logger.info(f"*******************")
        logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
        obj = TrainingPipeline()
        obj.main()
        logger.info(
            f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")
    except Exception as e:
        logger.exception(e)
        raise e
