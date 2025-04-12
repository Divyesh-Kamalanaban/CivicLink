/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../context/postContext";
import mukunthprof from "../assets/mukunth-profile.jpg";

function PostCard({
  title,
  description,
  contact,
  images,
  createdAt,
  city,
  state,
  pincode,
  postedBy,
  postID,
}) {
  const nav = useNavigate();
  const { setSelectedPost } = usePostContext();

  const formattedDate = new Date(createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const timeAgo = () => {
    const seconds = Math.floor((new Date() - new Date(createdAt)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds/60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds/3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds/86400)}d ago`;
    return formattedDate;
  };

  const handleClick = () => {
    setSelectedPost({
      title,
      description,
      contact,
      images,
      createdAt,
      city,
      state,
      pincode,
      postedBy,
      postID,
    });
    nav("/home/view-post");
  };

  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image section */}
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        {images.length > 0 ? (
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={images[0].base64}
            alt={title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No Image Available</span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-4">
        {/* Title and time */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
            {timeAgo()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 line-clamp-3 mb-3">{description}</p>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-1">📍</span>
          <span>
            {[city, state, pincode].filter(Boolean).join(", ")}
          </span>
        </div>

        {/* Date */}
        <div className="text-sm text-gray-500 mb-4">
          <span>📅</span>
          <span className="ml-1">{formattedDate}</span>
        </div>

        {/* Footer with author and button */}
        <div className="flex items-center justify-between border-t pt-3">
          <div className="flex items-center">
            <img 
              src={postedBy?.profilePic || mukunthprof} 
              alt="Profile" 
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              {postedBy?.name || "Anonymous"}
            </span>
          </div>
          
          <button
            onClick={handleClick}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;