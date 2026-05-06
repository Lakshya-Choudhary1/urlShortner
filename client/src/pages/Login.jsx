import React, { useState } from "react";
import { BASEURL } from "@/config/config.js";
import useUserStore from "@/store/useUserStore.js";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useUserStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await login(formData);
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
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600/80 hover:bg-blue-500 
            text-white py-3 rounded-lg transition"
          >
            Login
          </button>

          {/* Signup */}
          <div className="flex gap-2 justify-center text-sm">
            <p className="text-slate-400">Don't have an account?</p>
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
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
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-slate-200">Continue with Google</span>
        </a>

        {/* Forgot Password */}
        <div className="flex gap-2 justify-center mt-4 text-sm">
          <p className="text-slate-400">Forgot your password?</p>
          <Link to="/forgotPassword" className="text-blue-400 hover:underline">
            Reset
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;