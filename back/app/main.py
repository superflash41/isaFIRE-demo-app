import gc
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.services.model_loader import load_model, cleanup_model
from app.routes.predict import router as predict_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = load_model()
    yield
    cleanup_model(app.state.model)

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
