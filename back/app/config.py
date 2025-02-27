import os
from dotenv import load_dotenv

load_dotenv()

DENSENET_PATH = os.getenv("DENSENET_PATH")
RESNET_PATH = os.getenv("RESNET_PATH")
XCEPTION_PATH = os.getenv("XCEPTION_PATH")
ENSEMBLE_PATH = os.getenv("ENSEMBLE_PATH")