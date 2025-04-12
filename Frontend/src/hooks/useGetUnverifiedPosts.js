import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePostContext } from "../context/postContext";

function useGetUnverifiedPosts() {
  const [loading, setLoading] = useState(false);
  const { unverifiedPosts, setUnverifiedPosts } = usePostContext();
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/unverified-posts");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUnverifiedPosts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return { loading, unverifiedPosts };
}

export default useGetUnverifiedPosts;
