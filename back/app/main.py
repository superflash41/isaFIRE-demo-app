import gc
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.services.model_loader import load_all_models, cleanup_all_models
from app.routes.predict import router as predict_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # load all the models
    app.state.models = load_all_models()
    yield
    # cleanup at shutdown
    cleanup_all_models(app.state.models)

app = FastAPI(lifespan=lifespan)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
