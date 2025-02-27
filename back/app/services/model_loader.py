import gc
from tensorflow import keras

def load_all_models():
    print("🔥 Loading models...")
    models = {
        "densenet": keras.models.load_model("models/densenet.keras"),
        "resnet": keras.models.load_model("models/resnet_final.keras"),
        "xception": keras.models.load_model("models/xception_final.keras")
    }
    return models

def cleanup_all_models(models_dict):
    print("🧹 Cleaning up models...")
    for name, model in models_dict.items():
        del model
    gc.collect()
