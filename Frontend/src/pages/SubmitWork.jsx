import React, { useState } from "react";
import useWork from "../hooks/useWork";
import ImageUploader from "../components/ImageUploader";
import { useNavigate } from "react-router-dom";

function SubmitWork() {
  const nav = useNavigate();
  const { loading, submitWork } = useWork();
  const [inputs, setInputs] = useState({
    description: "",
    images: [],
  });

  const handleImagesChange = (uploadedImages) => {
    setInputs((prevState) => ({
      ...prevState,
      images: uploadedImages,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitWork(inputs);
    nav("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Submit Your Work Request</h2>
            <p className="mt-2 text-sm text-gray-600">
              Describe the problem and upload relevant images to get help
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe the problem in detail and specify the help needed..."
                value={inputs.description}
                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <ImageUploader onImagesChange={handleImagesChange} />
              <p className="mt-1 text-xs text-gray-500">
                Upload up to 5 images (PNG, JPG) to help illustrate the problem
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => nav(-1)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubmitWork;