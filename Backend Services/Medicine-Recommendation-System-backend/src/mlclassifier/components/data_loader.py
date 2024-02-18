import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from mlclassifier import logger
import logging


class DataLoader:
    def __init__(self, config):
        self.config = config
        logging.info("DataLoader initialized with config.")

    def loadDataset(self):
        logging.info("Starting to load datasets.")

        root_path = self.config.root_dir

        sym_des = pd.read_csv(f"{root_path}/symtoms_df.csv")
        logging.info("Symptoms dataset loaded.")

        precautions = pd.read_csv(f"{root_path}/precautions_df.csv")
        logging.info("Precautions dataset loaded.")

        workout = pd.read_csv(f"{root_path}/workout_df.csv")
        logging.info("Workout dataset loaded.")

        description = pd.read_csv(f"{root_path}/description.csv")
        logging.info("Description dataset loaded.")

        medications = pd.read_csv(f'{root_path}/medications.csv')
        logging.info("Medications dataset loaded.")

        diets = pd.read_csv(f"{root_path}/diets.csv")
        logging.info("Diets dataset loaded.")

        data = pd.read_csv(f"{root_path}/training.csv")
        logging.info("Training dataset loaded.")

        return data, sym_des, precautions, workout, description, medications, diets

    def processing(self, dataset):
        logging.info("Starting dataset processing.")

        dataset.dropna(inplace=True)

        # print(dataset['prognosis'])
        X = dataset.drop('prognosis', axis=1)
        y = dataset['prognosis']

        allSymptoms = X.columns

        logging.info(f"all Symptoms: {allSymptoms}")

        symptoms_dict = {prognosis: index for index,
                         prognosis in enumerate(allSymptoms)}
        logging.info(f"Symptoms to integer mapping: {symptoms_dict}")

        allClasses = y.unique()
        logging.info(f"Unique values in prognosis: {allClasses}")

        # Creating a mapping from prognosis to integers starting from 1
        prognosis_mapping = {index +
                             1: prognosis for index, prognosis in enumerate(allClasses)}
        logging.info(f"Prognosis to integer mapping: {prognosis_mapping}")

        prognosis_mapping_list = {prognosis: index +
                                  1 for index, prognosis in enumerate(allClasses)}
        logging.info(f"Prognosis to integer mapping: {prognosis_mapping}")

        # encoding prognosis
        Y = y.map(prognosis_mapping_list)

        logging.info("Prognosis encoded.")

        # print(Y)

        return X, Y, prognosis_mapping, symptoms_dict

    def splitDataset(self, X, Y, split_size=0.2, shuffle=True, random_state=42):
        logging.info(
            f"Splitting dataset with test size {split_size}, shuffle={shuffle}, random_state={random_state}.")

        X_train, X_test, y_train, y_test = train_test_split(
            X, Y, test_size=split_size, random_state=random_state)

        logging.info("Dataset split completed.")

        X_train = np.array(X_train)

        # print(X_train)
        X_test = np.array(X_test)
        y_train = np.array(y_train)
        y_test = np.array(y_test)

        return X_train, X_test, y_train, y_test
