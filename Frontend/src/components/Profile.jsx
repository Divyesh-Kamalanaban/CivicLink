import React from "react";
import { useAuthContext } from "../context/authContext";
import avatar from "../assets/mukunth-profile.jpg";

function Profile() {
  const { authUser } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">View and manage your account information</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Personal Details Card */}
          <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img 
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100" 
                  src={avatar} 
                  alt="Profile" 
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Civic ID</p>
                    <p className="font-medium">{authUser._id.slice(-10)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Civic Credits</p>
                    <p className="font-medium">{authUser.civicCredits}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{authUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{authUser.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{authUser.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{authUser.city}, {authUser.state} - {authUser.pincode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{authUser.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Work History Card */}
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Work History</h2>
              <div className="flex items-center justify-center h-48 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                <p>Your completed work will appear here</p>
              </div>
            </div>

            {/* User Posts Card */}
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">My Posts</h2>
              <div className="flex items-center justify-center h-48 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                <p>Your posts will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 