import os
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
import logging


class ModelTraining:

    def __init__(self,  X_train, X_test, y_train, y_test, output_dir):
        self.X_train = X_train
        self.X_test = X_test
        self.y_train = y_train
        self.y_test = y_test
        self.models = {}
        self.output_dir = output_dir
        self.logger = logging.getLogger(__name__)

    def train_model(self, model_name, model):
        self.logger.info(f"Training {model_name} model...")

        print(self.X_train, self.y_train)

        model.fit(self.X_train, self.y_train)
        y_pred = model.predict(self.X_test)

        accuracy = accuracy_score(self.y_test, y_pred)
        precision = precision_score(self.y_test, y_pred, average='weighted')
        recall = recall_score(self.y_test, y_pred, average='weighted')
        f1 = f1_score(self.y_test, y_pred, average='weighted')

        conf_matrix = confusion_matrix(self.y_test, y_pred)
        self.models[model_name] = {
            'model': model,
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1_score': f1,
            'confusion_matrix': conf_matrix
        }
        self.logger.info(f"{model_name} model training complete.")

    def train_all_models(self):
        self.logger.info("Training all models...")
        dt_classifier = DecisionTreeClassifier()
        rf_classifier = RandomForestClassifier(n_estimators=100)
        # svm_classifier = SVC(kernel='linear', C=1)
        # gb_classifier = GradientBoostingClassifier(n_estimators=100)
        lr_classifier = LogisticRegression(max_iter=1000)
        knn_classifier = KNeighborsClassifier()
        nb_classifier = GaussianNB()

        # Train and store all models
        # self.train_model('SVM', svm_classifier)
        # self.train_model('GradientBoosting', gb_classifier)
        self.train_model('DecisionTree', dt_classifier)
        self.train_model('RandomForest', rf_classifier)
        self.train_model('LogisticRegression', lr_classifier)
        self.train_model('KNeighbors', knn_classifier)
        self.train_model('NaiveBayes', nb_classifier)
        self.logger.info("All models trained.")

    def get_trained_models(self):
        return self.models

    def save_confusion_matrices(self):
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

        for model_name, model_info in self.models.items():
            self.logger.info(f"Saving confusion matrix for {model_name}...")
            conf_matrix = model_info['confusion_matrix']
            plt.figure(figsize=(8, 6))
            plt.imshow(conf_matrix, cmap=plt.cm.Blues)
            plt.title(f'Confusion Matrix - {model_name}')
            plt.colorbar()
            plt.xticks(np.arange(len(conf_matrix)),
                       np.arange(len(conf_matrix)))
            plt.yticks(np.arange(len(conf_matrix)),
                       np.arange(len(conf_matrix)))
            plt.xlabel('Predicted')
            plt.ylabel('True')
            plt.tight_layout()
            plt.savefig(os.path.join(self.output_dir,
                        f'confusion_matrix_{model_name}.png'))
            plt.close()
            self.logger.info(f"Confusion matrix for {model_name} saved.")
