# Wildfire Classifier - 1INF52 Project

<p align="center">
    <img src="https://img.shields.io/badge/Bun-f5e0dc?logo=bun&logoColor=black" alt="Bun" />
    <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=black" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-f5c2e7?logo=tailwindcss&logoColor=black" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Python-f9e2af?logo=python&logoColor=black" alt="Python" />
    <img src="https://img.shields.io/badge/FastAPI-74c7ec?logo=fastapi&logoColor=black" alt="FastAPI" />
    <img src="https://img.shields.io/badge/TensorFlow-f2cdcd?logo=tensorflow&logoColor=black" alt="TensorFlow" />
</p>


Simple web application for testing several deep learning models that classify images as **fire** or **no fire**. It was built as a demonstration project for the **1INF52** course at PUCP.

The app includes:
- **Back end**: a Python **FastAPI** server that loads Keras/TensorFlow models and exposes a `/predict` endpoint.
- **Front end**: a React application (bundled with Vite and managed via Bun) that allows users to upload an image, select a model and get the classification result.

## Set up
### 1 Clone the repository

```bash
git clone https://github.com/superflash41/isaFIRE.git
cd isaFIRE
```

### 2 Back End (**FastAPI**)

1. Move into the `back` directory

```bash
cd back
```

2. Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Configure the paths of the models in a `.env` file
5. Run the FastAPI server

```bash
uvicorn app.main:app --reload --port 8000
```

The server will start on http://localhost:8000.

### 3 Front End (React + Bun + Vite)

1. Move into the `front` directory

```bash
cd front
```

2. Install dependencies with Bun

```bash
bun install
```

3. Configure the API URL in an `.env` file
4. Start the development server

```bash
bun run dev
```

This launches Vite, usually on http://localhost:5173.

## Usage

1. Open your browser at http://localhost:5173.
2. Choose a **model** from the dropdown (e.g., DenseNet, ResNet, Xception, or Ensemble).
3. Click the **upload area** to select an image (jpg/png).
4. Click ***Classify Image*** to send the file to the FastAPI endpoint.
5. View the classification **label** and **confidence**.

**Enjoy testing the wildfire classifier!** If you have any questions, please reach out or open an issue.