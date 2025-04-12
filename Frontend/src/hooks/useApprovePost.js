import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useApprovePost = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const approve = async (id) => {
    setLoading(true);
    try {
      const bodyData = { id: id };
      console.log(bodyData);
      const res = await fetch("/api/post/verify-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Posted");
      nav("/dashboard/approve-posts");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, approve };
};

export default useApprovePost;
