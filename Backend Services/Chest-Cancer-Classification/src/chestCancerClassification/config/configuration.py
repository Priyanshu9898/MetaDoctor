from chestCancerClassification.constants import *
from chestCancerClassification.utils.common import read_yaml, create_directories
from chestCancerClassification.entity import DataIngestionConfig, PrepareBaseModelConfig, TrainingConfig, TrainingCNNConfig
import os


class ConfigurationManager:
    def __init__(self, config_file_path=CONFIG_FILE_PATH, param_file_path=PARAMS_FILE_PATH) -> None:

        self.config = read_yaml(config_file_path)
        self.param = read_yaml(param_file_path)

        create_directories([self.config.artifacts_root])

    def get_data_ingestion_config(self) -> DataIngestionConfig:
        config = self.config.data_ingestion

        create_directories([config.root_dir])

        data_ingestion_config = DataIngestionConfig(
            root_dir=config.root_dir,
            source_url=config.source_url,
            local_data_file=config.local_data_file,
            unzip_data=config.unzip_data
        )

        return data_ingestion_config

    def get_prepare_base_model_config(self) -> PrepareBaseModelConfig:
        config = self.config.prepare_base_model

        print(self.config.prepare_base_model)

        create_directories([config.root_dir])

        prepare_base_model_config = PrepareBaseModelConfig(
            root_dir=Path(config.root_dir),
            base_model_vgg16=Path(config.base_model_vgg16),
            updated_base_model_vgg16=Path(config.updated_base_model_vgg16),
            base_model_vgg19=Path(config.base_model_vgg19),
            updated_base_model_vgg19=Path(config.updated_base_model_vgg19),
            base_model_resnet=Path(config.base_model_resnet),
            updated_base_model_resnet=Path(config.updated_base_model_resnet),
            base_model_mobilenet=Path(config.base_model_mobilenet),
            updated_base_model_mobilenet=Path(
                config.updated_base_model_mobilenet),
            base_model_mobilenetv2=Path(config.base_model_mobilenetv2),
            updated_base_model_mobilenetv2=Path(
                config.updated_base_model_mobilenetv2),
            base_model_inceptionv3=Path(config.base_model_inceptionv3),
            updated_base_model_inceptionv3=Path(
                config.updated_base_model_inceptionv3),
            base_model_xception=Path(config.base_model_xception),
            updated_base_model_xception=Path(
                config.updated_base_model_xception),
            all_model_params=self.param,
            params_classes=self.param.CLASSES,
            params_learning_rate=self.param.LEARNING_RATE
        )

        return prepare_base_model_config

    def get_training_config_vgg16(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.VGG16
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_vgg16),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_vgg16),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_vgg19(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.VGG19
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_vgg19),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_vgg19),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_resnet(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.RESNET
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_resnet),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_resnet),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_inceptionv3(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.INCEPTIONV3
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_inceptionv3),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_inceptionv3),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_xception(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.Xception
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_xception),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_xception),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_mobilenet(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.MOBILENET
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_mobilenet),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_mobilenet),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_mobilenetv2(self) -> TrainingConfig:
        config = self.config.training
        params = self.param.MOBILENETV2
        prepare_base_model = self.config.prepare_base_model

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingConfig(
            root_dir=Path(config.root_dir),
            trained_model_path=Path(config.trained_model_path_mobilenetv2),
            updated_base_model_path=Path(
                prepare_base_model.updated_base_model_mobilenetv2),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config

    def get_training_config_cnn(self) -> TrainingCNNConfig:
        config = self.config.training
        params = self.param.CNN

        training_data = os.path.join(
            self.config.data_ingestion.unzip_data, "train")
        validation_data = os.path.join(
            self.config.data_ingestion.unzip_data, "valid")
        test_data = os.path.join(self.config.data_ingestion.unzip_data, "test")

        create_directories([
            Path(config.root_dir),
            Path(config.results_dir)
        ])

        # print("training_data", training_data)

        training_config = TrainingCNNConfig(
            root_dir=Path(config.root_dir),
            training_data=Path(training_data),
            validation_data=Path(validation_data),
            test_data=Path(test_data),
            params_epochs=params.EPOCHS,
            params_batch_size=params.BATCH_SIZE,
            params_is_augmentation=params.AUGMENTATION,
            params_image_size=params.IMAGE_SIZE,
            results_folder=Path(config.results_dir)
        )

        return training_config
