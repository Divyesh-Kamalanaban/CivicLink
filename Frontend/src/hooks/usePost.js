import { useState } from "react";
import toast from "react-hot-toast";

const usePost = () => {
  const [loading, setLoading] = useState(false);

  const post = async ({
    title,
    description,
    state,
    city,
    pincode,
    contact,
    images,
  }) => {
    const success = handleInputErrors({
      title,
      description,
      state,
      city,
      pincode,
      contact,
      images,
    });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          state,
          city,
          pincode,
          contact,
          images,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Post sent for Verification")
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, post };
};

export default usePost;

const handleInputErrors = ({
  title,
  description,
  state,
  city,
  pincode,
  contact,
  images,
}) => {
  if (
    !title ||
    !description ||
    !state ||
    !city ||
    !pincode ||
    !contact ||
    !images
  ) {
    toast.error("Fields should not be empty");
    return false;
  }
  return true;
};
