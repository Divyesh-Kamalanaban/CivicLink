/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const useApproveWork = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const approve = async ({
    civicCredits,
    doneBy,
    refPost,
    unverifiedWorkID,
  }) => {
    setLoading(true);
    try {
      const bodyData = {
        civicCredits: civicCredits,
        doneBy: doneBy,
        refPost: refPost,
        unverifiedWorkID: unverifiedWorkID,
      };
      console.log(bodyData);
      const res = await fetch("/api/work/verify-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("approved");
      nav("/dashboard/approve-work");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, approve };
};

export default useApproveWork;
