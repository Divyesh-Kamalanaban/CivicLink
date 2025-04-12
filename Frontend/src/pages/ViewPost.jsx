/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { usePostContext } from "../context/postContext";
import ImageCarousel from "../components/ImageCarousel";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";

function ViewPost() {
  const { selectedPost } = usePostContext();
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Post Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Image Carousel */}
          <div className="w-full h-96 bg-gray-100">
            <ImageCarousel images={selectedPost?.images} />
          </div>

          <div className="p-6 md:p-8">
            {/* Post Title and Description */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {selectedPost?.title}
              </h1>
              <p className="text-lg text-gray-700">
                {selectedPost?.description}
              </p>
            </div>

            {/* Location */}
            <div className="flex justify-center mb-8">
              <div className="bg-red-50 px-4 py-2 rounded-full">
                <span className="text-red-600 font-medium">
                  {selectedPost?.city}, {selectedPost?.state} - {selectedPost?.pincode}
                </span>
              </div>
            </div>

            {/* Posted By Section */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Posted By
              </h2>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <img 
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm" 
                    src={avatar} 
                    alt="Profile" 
                  />
                </div>
                
                {/* User Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <DetailItem label="Civic ID" value={selectedPost?.postedBy._id.slice(-10)} />
                  <DetailItem label="Name" value={selectedPost?.postedBy.name} />
                  <DetailItem label="Date of Birth" value={selectedPost?.postedBy.dob} />
                  <DetailItem label="Gender" value={selectedPost?.postedBy.gender} />
                  <DetailItem label="State" value={selectedPost?.postedBy.state} />
                  <DetailItem label="City" value={selectedPost?.postedBy.city} />
                  <DetailItem label="Pincode" value={selectedPost?.postedBy.pincode} />
                  <DetailItem label="Contact" value={selectedPost?.postedBy.contact} />
                </div>
              </div>
            </div>

            {/* Submit Work Button */}
            <div className="flex justify-center">
              <button 
                onClick={() => nav("/home/submit-work")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md transform hover:scale-105"
              >
                Submit Your Work
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for detail items
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || '-'}</p>
  </div>
);

export default ViewPost;