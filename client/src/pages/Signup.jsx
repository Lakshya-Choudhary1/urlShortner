import React, { useState } from "react";
import { BASEURL } from "@/config/config.js";
import useUserStore from "../store/useUserStore.js";
import {Link} from "react-router-dom";

const Signup = () => {

  const {signup} = useUserStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // signup API call here
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:opacity-90"
          >
            Signup
          </button>

          <div className="flex gap-3 justify-center "> 
            <p className="text-md text-slate-700">Already have an account?</p>
            <Link  to={"/login"} className="text-md text-blue-700">Login</Link>
          </div>
        </form>

        <div className="my-5 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        <a
          href={`${BASEURL}/oauth/google`}
          className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </a>
      </div>
    </div>
  );
};

export default Signup;