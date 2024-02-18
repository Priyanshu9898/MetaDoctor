import dill
import os
import logging

class ModelEvaluation:
    
    def __init__(self, trained_models, output_dir):
        self.trained_models = trained_models
        self.output_dir = output_dir
        self.logger = logging.getLogger(__name__)
    
    def get_best_model(self, metric='accuracy'):
        best_model_name = None
        best_metric_value = 0.0
        
        for model_name, model_info in self.trained_models.items():
            metric_value = model_info.get(metric, 0.0)
            if metric_value > best_metric_value:
                best_metric_value = metric_value
                best_model_name = model_name
        
        if best_model_name:
            self.logger.info(f"Best model selected based on {metric}: {best_model_name}")
            return self.trained_models[best_model_name]['model']
        else:
            self.logger.warning("No best model found.")
            return None
    
    def save_best_model(self, best_model, filename='best_model.dill'):
        if best_model:
            filepath = os.path.join(self.output_dir, filename)
            with open(filepath, 'wb') as f:
                dill.dump(best_model, f)
            self.logger.info(f"Best model saved as {filename} in {self.output_dir}")
        else:
            self.logger.warning("No best model found.")
