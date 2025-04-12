import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePostContext } from "../context/postContext";

function useGetPosts() {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts } = usePostContext();
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/getall");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setPosts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return { loading, posts };
}

export default useGetPosts;
