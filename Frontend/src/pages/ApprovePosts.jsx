import React from "react";
import useGetUnverifiedPosts from "../hooks/useGetUnverifiedPosts";
import PostCard from "../components/PostCard";
import UnverifiedPostCard from "../components/UnverifiedPostCard";

function ApprovePosts() {
  const { unverifiedPosts } = useGetUnverifiedPosts();
  return (
    <div className="w-full p-4 flex flex-wrap items-start justify-start">
      {unverifiedPosts?.posts.map((post) => (
        <UnverifiedPostCard
          key={post._id}
          title={post.title}
          images={post.images}
          description={post.description}
          city={post.city}
          state={post.state}
          pincode={post.pincode}
          createdAt={post.createdAt}
          id={post._id}
          postedBy={post.postedBy}
        />
      ))}
    </div>
  );
}

export default ApprovePosts;
