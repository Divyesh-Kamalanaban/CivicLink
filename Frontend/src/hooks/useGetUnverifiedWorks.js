import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useWorkContext } from "../context/workContext";

function useGetUnverifiedWorks() {
  const [loading, setLoading] = useState(false);
  const { unverifiedWorks, setUnverifiedWorks } = useWorkContext();
  useEffect(() => {
    const getWorks = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/work/unverified-works");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setUnverifiedWorks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getWorks();
  }, []);

  return { loading, unverifiedWorks };
}

export default useGetUnverifiedWorks;
