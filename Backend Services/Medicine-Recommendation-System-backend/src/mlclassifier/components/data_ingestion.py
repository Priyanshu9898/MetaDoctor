import os
import zipfile
import gdown
from mlclassifier import logger
from mlclassifier.utils.common import get_size
from mlclassifier.entity import DataIngestionConfig
import requests
import io


class DataIngestion:
    def __init__(self, config: DataIngestionConfig):
        self.config = config

    def download_file(self) -> None:
        '''
        Fetch data from the url and save it as a zip file.
        '''
        try:
            dataset_url = self.config.source_URL
            zip_download_dir = self.config.local_data_file
            os.makedirs("artifacts/data_ingestion", exist_ok=True)

            file_id = dataset_url.split("/d/")[1].split("/")[0]
            download_url = f"https://drive.google.com/uc?export=download&id={file_id}"

            response = requests.get(download_url)
            
            # print(response.content)
            with open(zip_download_dir, "wb") as file:
                file.write(response.content)
                logger.info(f"Downloaded the zip file into data.zip")
        except Exception as e:
            logger.error(f"Failed to download the file using requests: {e}")
            raise e

    def extract_zip_file(self) -> None:
        """
        Extracts the zip file into the data directory.
        """
        try:
            unzip_path = self.config.unzip_dir
            os.makedirs(unzip_path, exist_ok=True)
            with zipfile.ZipFile(self.config.local_data_file, 'r') as zip_ref:
                zip_ref.extractall(unzip_path)
            logger.info(f"Extracted the zip file into {unzip_path}")
        except Exception as e:
            logger.error(f"Failed to extract the zip file: {e}")
            raise e
