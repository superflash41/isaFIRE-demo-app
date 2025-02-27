import gc
from tensorflow import keras
from app.config import (
    DENSENET_PATH, RESNET_PATH, XCEPTION_PATH, ENSEMBLE_PATH
)

def load_all_models():
    print("🔥 Loading models...")
    models = {
        "densenet": keras.models.load_model(DENSENET_PATH),
        "resnet": keras.models.load_model(RESNET_PATH),
        "xception": keras.models.load_model(XCEPTION_PATH),
        "ensemble": keras.models.load_model(ENSEMBLE_PATH)
    }
    return models

def cleanup_all_models(models_dict):
    print("🧹 Cleaning up models...")
    for name, model in models_dict.items():
        del model
    gc.collect()
