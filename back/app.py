import gc

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from tensorflow import keras
from PIL import Image
import numpy as np
import io
import gc

# define the lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = keras.models.load_model("models/densenet.keras")
    yield
    del app.state.model
    gc.collect()

app = FastAPI(lifespan=lifespan)

@app.post("/predict")
async def predict_fire(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224)) # resizing based on the model's input shape
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # run inference
        predictions = app.state.model.predict(img_array)
        fire_prob = float(predictions[0][0])
        label = "fire" if fire_prob > 0.5 else "no_fire"

        return JSONResponse({"label": label, "confidence": fire_prob})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
