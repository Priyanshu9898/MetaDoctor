from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir: Path
    source_URL: str
    local_data_file: Path
    unzip_dir: Path


@dataclass(frozen=True)
class DataProcesssingConfig:
    data_dir: Path


@dataclass(frozen=True)
class ModelTrainingConfig:
    root_dir: Path
    checkpoint_path: Path
    model_path: Path
    acccuracy_path: Path
    confusionMetrix_path: Path
    
