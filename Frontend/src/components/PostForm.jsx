import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import usePost from "../hooks/usePost";
import SelectLocation from "./SelectLocation";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const nav = useNavigate();
  const { loading, post } = usePost();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    state: "",
    city: "",
    pincode: "",
    contact: "",
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
    post(inputs);
    nav("/home");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create a New Post</h1>
            <p className="mt-2 text-sm text-gray-600">
              Share details about the help you need with the community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                id="title"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Brief title for your request"
                value={inputs.title}
                onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                rows={4}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe the problem in detail and specify the help needed..."
                value={inputs.description}
                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
              />
            </div>

            <SelectLocation inputs={inputs} setInputs={setInputs} />

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact Information *
              </label>
              <input
                id="contact"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Phone number or email where people can reach you"
                value={inputs.contact}
                onChange={(e) => setInputs({ ...inputs, contact: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <ImageUploader onImagesChange={handleImagesChange} />
              <p className="mt-1 text-xs text-gray-500">
                Upload images to help illustrate your request (Max 5 images)
              </p>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => nav(-1)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : 'Submit Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;