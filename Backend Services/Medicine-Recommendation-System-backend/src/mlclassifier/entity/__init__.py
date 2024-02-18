from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir: Path
    source_URL: str
    local_data_file: Path
    unzip_dir: Path

@dataclass(frozen=True)
class DataLoaderConfig:
    root_dir: Path
    
@dataclass(frozen=True)
class ModelTrainingConfig:
    root_dir: Path
    
@dataclass(frozen=True)
class ModelEvaluationConfig:
    root_dir: Path
    
@dataclass(frozen=True)
class PredictionConfig:
    best_model: Path