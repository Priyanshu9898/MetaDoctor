from chestCancerClassification.config.configuration import ConfigurationManager
from chestCancerClassification.components.prepare_base_model import Prepare_Base_Model
from chestCancerClassification import logger


STAGE_NAME = "Prepare Base Model Step"


class PrepareModelPipeline:
    def __init__(self):
        pass

    def main(self):
        config = ConfigurationManager()
        prepare_base_model_config = config.get_prepare_base_model_config()
        prepare_base_model = Prepare_Base_Model(
            config=prepare_base_model_config)

        logger.info("Preparing base model VGG16")
        prepare_base_model.get_base_model_vgg16()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_vgg16)

        logger.info("base model VGG16 updated successfully")

        logger.info("Preparing base model VGG19")
        prepare_base_model.get_base_model_vgg19()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_vgg19)

        logger.info("base model VGG19 updated successfully")

        logger.info("Preparing base model RESNET")
        prepare_base_model.get_base_model_resnet()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_resnet)

        logger.info("base model RESNET updated successfully")

        logger.info("Preparing base model Xception")
        prepare_base_model.get_base_model_xception()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_xception)

        logger.info("base model Xception updated successfully")

        logger.info("Preparing base model inceptionv3")
        prepare_base_model.get_base_model_inceptionv3()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_inceptionv3)

        logger.info("base model inceptionv3 updated successfully")

        logger.info("Preparing base model Mobilenet")
        prepare_base_model.get_base_model_mobilenet()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_mobilenet)

        logger.info("base model Mobilenet updated successfully")

        logger.info("Preparing base model mobilenetv2")
        prepare_base_model.get_base_model_mobilenetv2()
        prepare_base_model.update_base_model(
            prepare_base_model_config.updated_base_model_mobilenetv2)

        logger.info("base model mobilenetv2 updated successfully")


if __name__ == '__main__':
    try:
        logger.info(f"*******************")
        logger.info(f">>>>>> stage {STAGE_NAME} started <<<<<<")
        obj = PrepareModelPipeline()
        obj.main()
        logger.info(
            f">>>>>> stage {STAGE_NAME} completed <<<<<<\n\nx==========x")
    except Exception as e:
        logger.exception(e)
        raise e
