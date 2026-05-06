import React, { useState } from "react";
import useUserStore from "../store/useUserStore.js";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px]">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md 
        bg-slate-800/60 backdrop-blur-lg 
        border border-slate-700 
        rounded-2xl shadow-xl p-8 
        text-slate-200 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center tracking-wide text-slate-100">
          Forgot Password
        </h1>

        <p className="text-sm text-slate-400 text-center">
          Enter your email to reset your password
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-slate-900/60 border border-slate-700 
          rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 
          focus:border-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-blue-600/80 hover:bg-blue-500 
          text-white py-3 rounded-lg transition"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;