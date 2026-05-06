import useUserStore from "@/store/useUserStore.js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetPasswordToken } = useParams();
  const [password, setPassword] = useState("");

  const { resetPassword } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await resetPassword(password, resetPasswordToken);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4
      bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px]"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md 
        bg-slate-800/60 backdrop-blur-lg 
        border border-slate-700 
        shadow-xl rounded-2xl p-8 
        text-slate-200 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center tracking-wide text-slate-100">
          Reset Password
        </h1>

        <p className="text-sm text-slate-400 text-center">
          Enter your new password below
        </p>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
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
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;