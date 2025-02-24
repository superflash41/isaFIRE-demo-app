import gc
from tensorflow import keras

def load_model():
    print("🔥 Loading model...")
    return keras.models.load_model("models/densenet.keras")

def cleanup_model(model):
    print("🧹 Cleaning up model...")
    del model
    gc.collect()
