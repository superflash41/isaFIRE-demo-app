from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi import Request
from PIL import Image
import numpy as np
import io

router = APIRouter()

@router.post("/predict")
async def predict_fire(request: Request, file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image = image.resize((224, 224))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        model = request.app.state.model
        predictions = model.predict(img_array)
        fire_prob = float(predictions[0][0])
        label = "fire" if fire_prob > 0.5 else "no_fire"

        return JSONResponse({"label": label, "confidence": fire_prob})

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
