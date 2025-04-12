import React from "react";
import { usePostContext } from "../context/postContext";
import { useNavigate } from "react-router-dom";

function UnverifiedPostCard({
  title,
  description,
  contact,
  images,
  createdAt,
  city,
  state,
  pincode,
  id,
  postedBy,
}) {
  const { setSelectedUnverifiedPost } = usePostContext();
  const nav = useNavigate();
  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleClick = () => {
    setSelectedUnverifiedPost({
      title,
      description,
      contact,
      images,
      createdAt,
      city,
      state,
      pincode,
      id,
      postedBy,
    });
    nav("/dashboard/view-post");
  };
  return (
    <div className="max-w-sm mx-4 bg-white shadow-md rounded-lg overflow-hidden my-4">
      {/* Image section */}
      {images.length > 0 && (
        <img
          className="w-full h-48 object-cover "
          src={images[0].base64} // Display the first image
          alt={title}
        />
      )}

      {/* Content section */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        {/* Description */}
        <p className="mt-2 text-gray-600">{description}</p>

        {/* Location */}
        <div className="mt-4 text-gray-700">
          <span className="font-semibold">Location:</span> {city}, {state},{" "}
          {pincode}
        </div>

        {/* Contact */}

        {/* Date */}
        <div className="mt-2 text-gray-500 text-sm">
          <span className="font-semibold">Posted on:</span> {formattedDate}
        </div>

        {/* Action buttons */}
        <div className="flex mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnverifiedPostCard;
