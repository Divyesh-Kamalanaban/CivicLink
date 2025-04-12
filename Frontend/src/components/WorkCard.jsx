/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import useApproveWork from "../hooks/useApproveWork";

const WorkCard = ({ work }) => {
  const { loading, approve } = useApproveWork();
  const [civicCredits, setCivicCredits] = useState();
  const handleClick = () => {
    approve({
      doneBy: work.doneBy._id,
      refPost: work.refPost._id,
      civicCredits: civicCredits,
      unverifiedWorkID: work._id,
    });
  };
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex p-4">
      <div className="border border-gray-300 bg-white rounded-lg shadow-lg flex flex-col justify-between leading-normal">
        <div className="p-6 flex flex-col justify-between">
          {/* Volunteer Work Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {work?.description}
            </h2>
            <p className="text-gray-600 text-base">
              <strong>Done by:</strong> {work?.doneBy.name}
            </p>
            <p className="text-gray-600 text-base">
              <strong>Aadhaar:</strong> {work?.doneBy.aadhaar}
            </p>
            <p className="text-gray-600 text-base">
              <strong>City:</strong> {work?.doneBy.city}
            </p>
            <p className="text-gray-600 text-base">
              <strong>State:</strong> {work?.doneBy.state}
            </p>
            <p className="text-gray-600 text-base">
              <strong>Contact:</strong> {work?.doneBy.contact}
            </p>
            <p className="text-gray-600 text-base">
              <strong>Pincode:</strong> {work?.doneBy.pincode}
            </p>
            <p className="text-gray-600 text-base">
              <strong>Gender:</strong> {work?.doneBy.gender}
            </p>
            <p className="text-gray-600 text-base">
              <strong>Date of Birth:</strong> {work?.doneBy.dob}
            </p>
            <p className="text-gray-600 text-base">
              <strong>Created At:</strong>{" "}
              {new Date(work?.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Images Section */}
          {work?.images && work?.images.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Images:</h3>
              <div className="flex space-x-4">
                {work?.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.base64}
                    alt={`Work Image ${idx + 1}`}
                    className="w-[400px] object-cover border border-gray-300 rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* refPost Section */}
          {work?.refPost && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Reference Post
              </h3>
              <p className="text-gray-600 text-base">
                <strong>Title:</strong> {work?.refPost.title}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Description:</strong> {work?.refPost.description}
              </p>
              <p className="text-gray-600 text-base">
                <strong>City:</strong> {work?.refPost.city}
              </p>
              <p className="text-gray-600 text-base">
                <strong>State:</strong> {work?.refPost.state}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Pincode:</strong> {work?.refPost.pincode}
              </p>
              <p className="text-gray-600 text-base">
                <strong>Contact:</strong> {work?.refPost.contact}
              </p>

              {/* {work?.refPost.images && work?.refPost.images.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Reference Post Images:</h4>
                  <div className="flex space-x-4">
                    {work?.refPost.images.map((imageId, idx) => (
                      <img
                        key={idx}
                        src={imageId.base64}
                        alt={`RefPost Image ${idx + 1}`}
                        className="w-32 h-32 object-cover border border-gray-300 rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          )}
        </div>
        <input
          className=" border-2 border-red-700"
          type="number"
          value={civicCredits}
          onChange={(e) => setCivicCredits(e.target.value)}
          placeholder="Enter Civic Credits"
          required
        />
        <button onClick={handleClick}>approve work</button>
      </div>
    </div>
  );
};

export default WorkCard;
