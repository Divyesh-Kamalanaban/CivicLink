import React from "react";
import { usePostContext } from "../context/postContext";
import useGetPosts from "../hooks/useGetPosts";
import PostCard from "./PostCard";

function Feed() {
  const { posts, loading } = useGetPosts();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Community Help Board</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {posts?.posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-5xl mb-4">😞</span> {/* Emoji instead of FiFrown */}
                <h3 className="text-2xl font-medium text-gray-700">No Posts Available</h3>
                <p className="mt-2 text-gray-500">Be the first to share a request for help</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.posts.map((post) => (
                <PostCard
                  key={post._id}
                  title={post.title}
                  images={post.images}
                  description={post.description}
                  city={post.city}
                  state={post.state}
                  pincode={post.pincode}
                  createdAt={post.createdAt}
                  postedBy={post.postedBy}
                  postID={post._id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Feed;