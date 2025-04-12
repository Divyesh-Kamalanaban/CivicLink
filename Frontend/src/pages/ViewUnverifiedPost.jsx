import React from "react";
import { usePostContext } from "../context/postContext";
import ImageCarousel from "../components/ImageCarousel";
import useApprovePost from "../hooks/useApprovePost";

function ViewUnverifiedPost() {
  const { selectedUnverifiedPost } = usePostContext();

  const { loading, approve } = useApprovePost();
  return (
    <div className="w-full flex-col m-4 p-4 justify-center items-center">
      <ImageCarousel images={selectedUnverifiedPost?.images} />
      <div className="flex-col w-full mt-4 justify-center items-center">
        <h1 className="text-4xl text-center">
          {selectedUnverifiedPost?.title}
        </h1>
        <p className="text-2xl text-center">
          {selectedUnverifiedPost?.description}
        </p>
        <div className="text-center">
          <span className=" text-2xl text-red-700">
            {selectedUnverifiedPost?.city},
          </span>
          <span className=" text-2xl mx-1 text-red-700">
            {selectedUnverifiedPost?.state},
          </span>
          <span className=" text-2xl text-red-700">
            {selectedUnverifiedPost?.pincode}
          </span>
        </div>
        <div>
          <div className="flex w-1/3 border-2 rounded-xl shadow-sm p-4 m-4 items-center justify-center">
            <div>
              <h1 className="text-3xl ">Posted By</h1>
              <h2>Name: {selectedUnverifiedPost?.postedBy.name}</h2>
              <h2>Date of Birth: {selectedUnverifiedPost?.postedBy.dob}</h2>
              <h2>Gender: {selectedUnverifiedPost?.postedBy.gender}</h2>
              <h2>State: {selectedUnverifiedPost?.postedBy.state}</h2>
              <h2>City: {selectedUnverifiedPost?.postedBy.city}</h2>
              <h2>Pincode:{selectedUnverifiedPost?.postedBy.pincode}</h2>
              <h2>Contact: {selectedUnverifiedPost?.postedBy.contact}</h2>
            </div>
            <div className="w-40 h-40"></div>
          </div>
        </div>
        <button className="h-12 w-24 my-2 bg-blue-300 rounded-lg mx-2 "
          onClick={() => {
            approve(selectedUnverifiedPost?.id);
          }}
        >
          Make Public
        </button>
        <button className="h-12 w-24 my-2 bg-blue-300 rounded-lg mx-2 ">Reject</button>
      </div>
    </div>
  );
}

export default ViewUnverifiedPost;
