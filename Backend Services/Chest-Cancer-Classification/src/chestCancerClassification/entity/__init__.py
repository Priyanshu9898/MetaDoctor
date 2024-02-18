from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir: Path
    source_url: str
    local_data_file: Path
    unzip_data: Path
    
@dataclass(frozen=True)
class PrepareBaseModelConfig:
    root_dir: Path
    base_model_vgg16: Path
    updated_base_model_vgg16: Path
    base_model_vgg19: Path
    updated_base_model_vgg19: Path
    base_model_inceptionv3: Path
    updated_base_model_inceptionv3: Path
    base_model_xception: Path
    updated_base_model_xception: Path
    all_model_params: dict
    params_classes: int
    params_learning_rate: int
    updated_base_model_mobilenetv2: Path
    base_model_mobilenetv2: Path
    updated_base_model_mobilenet: Path
    base_model_mobilenet: Path
    updated_base_model_resnet: Path
    base_model_resnet: Path

@dataclass(frozen=True)
class TrainingConfig:
    root_dir: Path
    trained_model_path: Path
    updated_base_model_path: Path
    training_data: Path
    validation_data : Path
    test_data : Path
    params_epochs: int
    params_batch_size: int
    params_is_augmentation: bool
    params_image_size: list
    results_folder: Path

@dataclass(frozen=True)
class TrainingCNNConfig:
    root_dir: Path
    training_data: Path
    validation_data : Path
    test_data : Path
    params_epochs: int
    params_batch_size: int
    params_is_augmentation: bool
    params_image_size: list
    results_folder: Path