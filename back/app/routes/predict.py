from fastapi import APIRouter, UploadFile, Form, File
from fastapi.responses import JSONResponse
from fastapi import Request
from PIL import Image
import tensorflow as tf
import numpy as np
import io

router = APIRouter()

@router.post("/predict")
async def predict_fire(
        request: Request,
        file: UploadFile = File(...),
        model_name: str = Form(...)
):
    """
        model_name: a string that corresponds to the key for the desired model
                    (e.g., "densenet", "resnet", "xception").
        file: the uploaded image file.
    """
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))
        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # retrieve the selected model by name
        models_dict = request.app.state.models
        if model_name not in models_dict:
            return JSONResponse(
                {"error": f"Unknown model_name: {model_name}"},
                status_code=400
            )

        model = models_dict[model_name]
        print(model.summary())      # debug

        predictions = model.predict(img_array)
        raw_no_fire_prob = float(predictions[0][0])
        fire_prob = 1.0 - raw_no_fire_prob

        threshold = 0.75
        if fire_prob > threshold:
            label = "fire"
            confidence = fire_prob
        else:
            label = "no_fire"
            confidence = raw_no_fire_prob

        return JSONResponse({"label": label, "confidence": confidence})

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
