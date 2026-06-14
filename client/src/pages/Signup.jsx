import React, { useState } from "react";
import { BASEURL } from "@/config/config.js";
import useUserStore from "../store/useUserStore.js";
import { Link } from "react-router-dom";

const Signup = () => {
  const { signup } = useUserStore();

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

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    signup(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px]"
    >
      <div
        className="w-full max-w-md 
        bg-slate-800/60 backdrop-blur-lg 
        border border-slate-700 
        shadow-xl rounded-2xl p-8 text-slate-200"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-100 tracking-wide">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/60 border border-slate-700 
            rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 
            focus:border-blue-500 transition"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-900/60 border border-slate-700 
            rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 
            focus:border-blue-500 transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
            className="w-full bg-slate-900/60 border border-slate-700 
            rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 
            focus:border-blue-500 transition"
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-500 
            text-white py-3 rounded-lg transition"
          >
            Sign Up
          </button>

          {/* Login Link */}
          <div className="flex gap-2 justify-center text-sm">
            <p className="text-slate-400">Already have an account?</p>
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-slate-700"></div>
          <span className="px-3 text-slate-500 text-sm">OR</span>
          <div className="flex-1 border-t border-slate-700"></div>
        </div>

        {/* Google OAuth */}
        <a
          href={`${BASEURL}/oauth/google`}
          className="w-full border border-slate-700 
          bg-slate-900/60 hover:bg-slate-800/70 
          rounded-lg py-3 flex items-center justify-center gap-2 transition"
        >
          {/* Google Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="size-5"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.3 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.2 7.1l6.2 5.2C39.8 36.5 44 30.8 44 24c0-1.3-.1-2.4-.4-3.5z"
              />
            </svg>
          <span className="text-slate-200">Continue with Google</span>
        </a>
      </div>
    </div>
  );
};

export default Signup;