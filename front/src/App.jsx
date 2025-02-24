import { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl('');
    }
  };

  const API_URL = import.meta.env.VITE_API_URL
  const handleClassify = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

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

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className='text-4xl font-extrabold text-gray-800 mb-6'>Wildfire Classifier</h1>
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
            className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
                selectedFile
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedFile}
        >
          {loading ? "Classifying..." : "Classify Image"}
        </button>

        {result && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-lg text-center">
              <p className="text-xl font-bold">
                Label:{" "}
                <span
                    className={`${
                        result.label === "fire" ? "text-red-600" : "text-green-600"
                    }`}
                >
              {result.label}
            </span>
              </p>
              <p className="text-sm text-gray-600">
                Confidence: {result.confidence.toFixed(3)}
              </p>
            </div>
        )}
      </div>
  );
}

export default App;
