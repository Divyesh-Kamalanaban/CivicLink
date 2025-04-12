import { useState } from "react";
import toast from "react-hot-toast";
import { usePostContext } from "../context/postContext";

const useWork = () => {
  const [loading, setLoading] = useState(false);
  const { selectedPost } = usePostContext();
  const submitWork = async ({ description, images }) => {
    const success = handleInputErrors({
      description,
      images,
    });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/work/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postID: selectedPost?.postID,
          description,
          images,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Waiting for approval")
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitWork };
};

export default useWork;

const handleInputErrors = ({ description, images }) => {
  if (!description || !images) {
    toast.error("Fields should not be empty");
    return false;
  }
  return true;
};
