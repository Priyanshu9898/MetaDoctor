import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import ReduceLROnPlateau
import timm
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
from OralDiseaseClassifier import logger


class ModelTrainer:
    def __init__(self, config, model_name, num_classes, train_loader, val_loader, device, class_names):
        logger.info("Initializing ModelTrainer")
        self.model = timm.create_model(
            model_name, pretrained=True, num_classes=num_classes).to(device)
        self.criterion = nn.CrossEntropyLoss()
        self.optimizer = optim.Adam(self.model.parameters(), lr=0.001)
        self.scheduler = ReduceLROnPlateau(
            self.optimizer, mode='min', factor=0.1, patience=10)
        self.train_loader = train_loader
        self.val_loader = val_loader
        self.device = device
        self.model_name = model_name
        self.checkpoint_path = config.checkpoint_path
        self.model_path = config.model_path
        self.acccuracy_path = config.acccuracy_path
        self.confusionMetrix_path = config.confusionMetrix_path
        self.class_names = class_names
        logger.info(f"ModelTrainer initialized with model {model_name}")

    class EarlyStopping:
        def __init__(self, patience=5, min_delta=0):
            self.patience = patience
            self.min_delta = min_delta
            self.counter = 0
            self.best_loss = None
            self.early_stop = False

        def __call__(self, val_loss, model):
            if self.best_loss is None:
                self.best_loss = val_loss
                self.save_checkpoint(val_loss, model)
            elif val_loss > self.best_loss + self.min_delta:
                self.counter += 1
                logger.info(
                    f"Early stopping counter: {self.counter}/{self.patience}")
                if self.counter >= self.patience:
                    self.early_stop = True
            else:
                self.best_loss = val_loss
                self.save_checkpoint(val_loss, model)
                self.counter = 0

        def save_checkpoint(self, val_loss, model):
            torch.save(model.state_dict(), 'artifacts/results/checkpoint.pt')
            logger.info("Checkpoint saved")

    def train(self, num_epochs):
        logger.info(f"Starting training for {num_epochs} epochs")
        early_stopper = self.EarlyStopping(patience=10, min_delta=0.001)
        best_accuracy = 0.0
        best_model_wts = None
        train_losses, val_losses, train_accuracies, val_accuracies = [], [], [], []

        for epoch in range(num_epochs):
            self.model.train()
            # print("Type of self.train_loader:", type(self.train_loader))
            running_loss, running_corrects, total_samples = 0.0, 0, 0

            # Training loop
            for inputs, labels in self.train_loader:
                inputs, labels = inputs.to(self.device), labels.to(self.device)
                self.optimizer.zero_grad()
                outputs = self.model(inputs)
                loss = self.criterion(outputs, labels)
                loss.backward()
                self.optimizer.step()

                _, preds = torch.max(outputs, 1)
                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)
                total_samples += labels.size(0)

            train_loss = running_loss / total_samples
            train_acc = running_corrects.double() / total_samples
            train_losses.append(train_loss)
            train_accuracies.append(train_acc.item())

            # Validation loop
            self.model.eval()
            val_loss, val_corrects, val_samples = 0.0, 0, 0
            with torch.no_grad():
                for inputs, labels in self.val_loader:
                    inputs, labels = inputs.to(
                        self.device), labels.to(self.device)
                    outputs = self.model(inputs)
                    loss = self.criterion(outputs, labels)
                    _, preds = torch.max(outputs, 1)
                    val_loss += loss.item() * inputs.size(0)
                    val_corrects += torch.sum(preds == labels.data)
                    val_samples += labels.size(0)

            val_loss /= val_samples
            val_acc = val_corrects.double() / val_samples
            val_losses.append(val_loss)
            val_accuracies.append(val_acc.item())

            logger.info(
                f'Epoch {epoch + 1}/{num_epochs}, Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.4f}, Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.4f}')

            self.scheduler.step(val_loss)
            early_stopper(val_loss, self.model)
            if early_stopper.early_stop:
                logger.info("Early stopping triggered.")
                break

            if val_acc > best_accuracy:
                best_accuracy = val_acc
                best_model_wts = self.model.state_dict()

        if best_model_wts:
            self.model.load_state_dict(best_model_wts)

        logger.info("Training completed")

        # Plotting training and validation graphs
        self._plot_training_validation_graph(
            train_losses, val_losses, train_accuracies, val_accuracies)

        # Save the model
        torch.save(self.model.state_dict(
        ), f'{self.model_path}/{self.model_name}_oral_disease_classifier.pth')

    def evaluate(self):
        logger.info("Starting evaluation")
        self.model.eval()
        y_true, y_pred = [], []
        with torch.no_grad():
            for inputs, labels in self.val_loader:
                inputs, labels = inputs.to(self.device), labels.to(self.device)
                outputs = self.model(inputs)
                _, preds = torch.max(outputs, 1)
                y_true.extend(labels.cpu().numpy())
                y_pred.extend(preds.cpu().numpy())

        # Calculate metrics
        accuracy = accuracy_score(y_true, y_pred)
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_true, y_pred, average='macro')
        conf_matrix = confusion_matrix(y_true, y_pred)

        logger.info(
            f"Evaluation Metrics - Accuracy: {accuracy:.4f}, Precision: {precision:.4f}, Recall: {recall:.4f}, F1-Score: {f1:.4f}")

        # Plot and save confusion matrix
        self._plot_confusion_matrix(conf_matrix)

        return accuracy, precision, recall, f1

    def _plot_training_validation_graph(self, train_losses, val_losses, train_accuracies, val_accuracies):
        logger.info("Plotting training and validation graphs")
        plt.figure(figsize=(12, 5))
        plt.subplot(1, 2, 1)
        plt.plot(range(1, len(train_losses) + 1),
                 train_losses, label='Training Loss')
        plt.plot(range(1, len(val_losses) + 1),
                 val_losses, label='Validation Loss')
        plt.title('Training & Validation Loss')
        plt.xlabel('Epochs')
        plt.ylabel('Loss')
        plt.legend()

        plt.subplot(1, 2, 2)
        plt.plot(range(1, len(train_accuracies) + 1),
                 train_accuracies, label='Training Accuracy')
        plt.plot(range(1, len(val_accuracies) + 1),
                 val_accuracies, label='Validation Accuracy')
        plt.title('Training & Validation Accuracy')
        plt.xlabel('Epochs')
        plt.ylabel('Accuracy')
        plt.legend()
        plt.savefig(
            f'{self.acccuracy_path}/{self.model_name}_training_validation_graph.png')
        plt.close()

    def _plot_confusion_matrix(self, conf_matrix):
        logger.info("Plotting confusion matrix")
        plt.figure(figsize=(12, 8))
        sns.heatmap(conf_matrix, annot=True, fmt='g',
                    xticklabels=self.class_names, yticklabels=self.class_names)
        plt.title(f'Confusion Matrix for {self.model_name}')
        plt.xlabel('Predicted')
        plt.ylabel('True')
        plt.savefig(
            f'{self.confusionMetrix_path}/{self.model_name}_confusion_matrix.png')
        plt.close()
