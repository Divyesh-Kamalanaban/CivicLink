/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import SelectLocation from "../components/SelectLocation";

function Signup() {
  const nav = useNavigate();
  const { loading, signup } = useSignup();

  const [inputs, setInputs] = useState({
    name: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    pincode: "",
    contact: "",
    aadhaar: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Register
          </p>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Name"
          value={inputs.name}
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="date"
          placeholder="Date of Birth"
          value={inputs.dob}
          onChange={(e) => {
            console.log(inputs.dob)
            setInputs({ ...inputs, dob: e.target.value })}}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded  mt-4"
          type="text"
          placeholder="Gender"
          value={inputs.gender}
          onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded  mt-4"
          type="text"
          placeholder="Contact"
          value={inputs.contact}
          onChange={(e) => {
            setInputs({ ...inputs, contact: e.target.value })}}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded  mt-4"
          type="text"
          placeholder="Aadhaar"
          value={inputs.aadhaar}
          onChange={(e) => {
            setInputs({ ...inputs, aadhaar: e.target.value })}}
        />
        <SelectLocation inputs={inputs} setInputs={setInputs} />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Confirm Password"
          value={inputs.confirmPassword}
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
        />

        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="/login"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
