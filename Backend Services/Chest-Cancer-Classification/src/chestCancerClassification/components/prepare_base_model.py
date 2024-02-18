import tensorflow as tf
from pathlib import Path
from chestCancerClassification.entity import PrepareBaseModelConfig
from tensorflow.keras.layers import BatchNormalization, MaxPooling2D, Dropout, Flatten, Dense

class Prepare_Base_Model:
    def __init__(self, config: PrepareBaseModelConfig):
        self.config = config

    def get_base_model_vgg16(self):
        self.model = tf.keras.applications.VGG16(
            include_top=self.config.all_model_params.VGG16.INCLUDE_TOP,
            weights=self.config.all_model_params.VGG16.WEIGHTS,
            input_shape=self.config.all_model_params.VGG16.IMAGE_SIZE,
        )

    def get_base_model_vgg19(self):
        self.model = tf.keras.applications.VGG19(
            include_top=self.config.all_model_params.VGG19.INCLUDE_TOP,
            weights=self.config.all_model_params.VGG19.WEIGHTS,
            input_shape=self.config.all_model_params.VGG19.IMAGE_SIZE,
        )
    
    def get_base_model_resnet(self):
        self.model = tf.keras.applications.ResNet50(
            include_top=self.config.all_model_params.RESNET.INCLUDE_TOP,
            weights=self.config.all_model_params.RESNET.WEIGHTS,
            input_shape=self.config.all_model_params.RESNET.IMAGE_SIZE,
        )
    
    def get_base_model_mobilenet(self):
        self.model = tf.keras.applications.MobileNet(
            include_top=self.config.all_model_params.MOBILENET.INCLUDE_TOP,
            weights=self.config.all_model_params.MOBILENET.WEIGHTS,
            input_shape=self.config.all_model_params.MOBILENET.IMAGE_SIZE,
        )

    def get_base_model_mobilenetv2(self):
        self.model = tf.keras.applications.MobileNetV2(
            include_top=self.config.all_model_params.MOBILENETV2.INCLUDE_TOP,
            weights=self.config.all_model_params.MOBILENETV2.WEIGHTS,
            input_shape=self.config.all_model_params.MOBILENETV2.IMAGE_SIZE,
        )
    
    def get_base_model_inceptionv3(self):
        self.model = tf.keras.applications.InceptionV3(
            include_top=self.config.all_model_params.INCEPTIONV3.INCLUDE_TOP,
            weights=self.config.all_model_params.INCEPTIONV3.WEIGHTS,
            input_shape=self.config.all_model_params.INCEPTIONV3.IMAGE_SIZE,
        )
    
    def get_base_model_xception(self):
        self.model = tf.keras.applications.Xception(
            include_top=self.config.all_model_params.Xception.INCLUDE_TOP,
            weights=self.config.all_model_params.Xception.WEIGHTS,
            input_shape=self.config.all_model_params.Xception.IMAGE_SIZE,
        )
    
    
    
    @staticmethod
    def _prepare_full_model(model, classes, freeze_all, freeze_till, learning_rate):
        if freeze_all:
            for layer in model.layers:
                model.trainable = False
        elif (freeze_till is not None) and (freeze_till > 0):
            for layer in model.layers[:-freeze_till]:
                model.trainable = False
                
        # Adding new layers
        x = BatchNormalization()(model.output)
        x = MaxPooling2D(pool_size=(2, 2))(x)
        # x = Dropout(0.3)(x)
        x = Flatten()(x)
        x = Dense(1024, activation='relu')(x)
        x = Dropout(0.3)(x)
        x = Dense(512, activation='relu')(x)
        x = Dropout(0.3)(x)
        x = Dense(256, activation='relu')(x)
        x = Dropout(0.3)(x)
        prediction = tf.keras.layers.Dense(classes, activation='softmax')(x)

        # flatten_in = tf.keras.layers.Flatten()(model.output)
        # prediction = tf.keras.layers.Dense(
        #     units=classes,
        #     activation="softmax"
        # )(flatten_in)

        full_model = tf.keras.models.Model(
            inputs=model.input,
            outputs=prediction
        )

        full_model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
            loss=tf.keras.losses.CategoricalCrossentropy(),
            metrics=["accuracy"]
        )

        full_model.summary()
        return full_model

    def update_base_model(self, save_model_path: Path):
        self.full_model = self._prepare_full_model(
            model=self.model,
            classes=self.config.params_classes,
            freeze_all=True,
            freeze_till=None,
            learning_rate=self.config.params_learning_rate
        )

        self.save_model(path=save_model_path,
                        model=self.full_model)

    @staticmethod
    def save_model(path: Path, model: tf.keras.Model):
        model.save(path)

