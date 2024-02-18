from OralDiseaseClassifier.constants import *
from OralDiseaseClassifier.utils.common import read_yaml, create_directories
from OralDiseaseClassifier.entity import DataIngestionConfig, DataProcesssingConfig, ModelTrainingConfig
import os
from pathlib import Path


class ConfigurationManager:
    def __init__(
            self,
            config_filepath=CONFIG_FILE_PATH,
            params_filepath=PARAMS_FILE_PATH):

        self.config = read_yaml(config_filepath)
        self.params = read_yaml(params_filepath)

        create_directories([self.config.artifacts_root])

    def get_data_ingestion_config(self) -> DataIngestionConfig:
        config = self.config.data_ingestion

        create_directories([config.root_dir])

        data_ingestion_config = DataIngestionConfig(
            root_dir=config.root_dir,
            source_URL=config.source_URL,
            local_data_file=config.local_data_file,
            unzip_dir=config.unzip_dir
        )

        return data_ingestion_config

    def get_data_processing_config(self) -> DataProcesssingConfig:
        config = self.config.data_processing

        # print(config)
        # create_directories([config.root_dir])

        data_processing_config = DataProcesssingConfig(
            data_dir=Path(config.data_dir),
        )

        return data_processing_config

    def get_model_training_config(self) -> ModelTrainingConfig:
        config = self.config.model_training

        print(config)
        create_directories([config.root_dir])

        model_training_config = ModelTrainingConfig(
            root_dir=Path(config.root_dir),
            checkpoint_path=Path(config.checkpoint_path),
            model_path=Path(config.model_path),
            acccuracy_path=Path(config.acccuracy_path),
            confusionMetrix_path=Path(config.confusionMetrix_path),
        )

        return model_training_config
