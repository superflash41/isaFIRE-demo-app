import { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedModelName, setSelectedModelName] = useState("densenet");

  const API_URL = import.meta.env.VITE_API_URL

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl('');
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('model_name', selectedModelName);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const textResponse = await response.text(); // Debugging response
      console.log("🟢 Raw Response:", textResponse); // Debug log

      if (!response.ok) throw new Error('Error in request');
      const data = JSON.parse(textResponse);
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('An error occurred while classifying the image.');
    } finally {
      setLoading(false);
    }
  };

  const GitHubIcon = () => (
    <svg fill="currentColor" viewBox="0 0 16 16" className="w-8 h-8 mr-2">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );

  const HuggingFaceIcon = () => (
    <img src={`${import.meta.env.BASE_URL}hf-logo.svg`} alt="Hugging Face" className="w-10 h-10 mr-2" />
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-white bg-pattern">
      <main className="flex-grow flex flex-col items-center justify-center py-8 relative z-10">
        <h1 className="text-5xl font-extrabold mb-10 hover:text-yellow-800 transition duration-200">
          isaFIRE: Wildfire Classifier
        </h1>
        {/* description */}
        <div className="prose prose-lg prose-blue bg-orange-50 p-6 rounded-lg shadow-md mb-8 max-w-3xl text-center border boder-blue-100">
          <p className="text-md text-gray-800 leading-relaxed">
            This project introduces a deep learning model for real-time wildfire detection using drone-captured images.
            Part of the PUCP's 1INF52 course, it utilizes DenseNet, ResNet, Xception, and an ensemble, all trained via transfer learning on the FLAME dataset.
          </p>
          <p className="text-md text-gray-800 leading-relaxed mt-4">
            You can test these models by uploading an image.
          </p>
        </div>
        {/* links */}
        <div className="flex flex-wrap space-x-6 space-y-0 mb-8">
          <a
            href="https://github.com/superflash41/isaFIRE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <GitHubIcon />
            GitHub Repository
          </a>
          <a
            href="https://huggingface.co/superflash41/fire-chad-detector-v1.0" // Replace with your actual Hugging Face repo URL
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-yellow-500 transition-colors duration-200" // Changed hover color for HF
          >
            <HuggingFaceIcon />
            Hugging Face Models
          </a>
        </div>
        {/* model dropdown */}
        <div className="mb-4 py-2">
          <label className="mr-2 font-semibold">Select Model:</label>
          <select
            value={selectedModelName}
            onChange={(e) => setSelectedModelName(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="densenet">DenseNet</option>
            <option value="resnet">ResNet</option>
            <option value="xception">Xception</option>
            <option value="ensemble">Ensemble</option>
          </select>
        </div>

        <label className="cursor-pointer mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center hover:bg-gray-200 transition">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-64 h-auto object-cover border rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-600">Click to select an image</p>
            )}
          </div>
        </label>

        <button
          onClick={handleClassify}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition ${selectedFile
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={!selectedFile}
        >
          {loading ? "Classifying..." : "Classify Image"}
        </button>

        {
          result && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-lg text-center">
              <p className="text-xl font-bold">
                Result:{" "}
                <span
                  className={`${result.label === "fire" ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {result.label.toUpperCase()}
                </span>
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1 mt-4">
                <div
                  className={`h-2.5 rounded-full ${result.label === "fire" ? "bg-red-600" : "bg-green-600"}`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Confidence: {result.confidence.toFixed(3)}
              </p>
            </div>
          )
        }
      </main >
      <footer className="w-full bg-black mt-12 py-6 text-center text-white text-bold">
        <p>&copy; {new Date().getFullYear()} Wildfire Classifier. Powered by isaFIRE.</p>
      </footer>
    </div >
  );
}

export default App;
