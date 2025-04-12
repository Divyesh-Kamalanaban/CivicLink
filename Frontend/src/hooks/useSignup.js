import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signup = async ({
    name,
    dob,
    gender,
    state,
    city,
    pincode,
    contact,
    aadhaar,
    password,
    confirmPassword,
  }) => {
    const success = handleInputErrors({
      name,
      dob,
      gender,
      state,
      city,
      pincode,
      contact,
      aadhaar,
      password,
      confirmPassword,
    });
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dob,
          gender,
          state,
          city,
          pincode,
          contact,
          aadhaar,
          password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({
  name,
  dob,
  gender,
  state,
  city,
  pincode,
  contact,
  aadhaar,
  password,
  confirmPassword,
}) => {
  if (
    !name ||
    !dob ||
    !password ||
    !confirmPassword ||
    !gender ||
    !state ||
    !city ||
    !pincode ||
    !contact ||
    !aadhaar
  ) {
    toast.error("Fields should not be empty");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password should not be less than 6 characters");
    return false;
  }
  if (aadhaar.length!=12) {
    toast.error("Password should not be less than 6 characters");
    return false;
  }
  return true;
};
