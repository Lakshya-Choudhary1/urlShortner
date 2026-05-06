import useUserStore from "../store/useUserStore.js";
import React, { useState } from "react";

const EmailVerification = () => {
  const { resendEmailVerificationToken, emailVerify } = useUserStore();

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const fullOtp = otp.join("");

    if (fullOtp.length !== 4) {
      alert("OTP must be 4 digits");
      return;
    }

    emailVerify(fullOtp);
  };

  const handleResend = async () => {
    await resendEmailVerificationToken();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
      bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px]">

      {/* Card */}
      <div className="w-full max-w-md 
        bg-slate-800/60 backdrop-blur-lg 
        border border-slate-700 
        shadow-xl rounded-2xl p-8 text-center text-slate-200">

        <h1 className="text-2xl font-bold mb-3 text-slate-100 tracking-wide">
          Email Verification
        </h1>

        <p className="text-slate-400 mb-6 text-sm">
          Enter the 4-digit OTP sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl 
              bg-slate-900/60 border border-slate-700 
              rounded-lg text-slate-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 
              focus:border-blue-500 transition"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600/80 hover:bg-blue-500 
          text-white py-3 rounded-lg transition"
        >
          Verify OTP
        </button>
      </div>

      {/* Resend */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="text-slate-400 text-sm">
          Didn’t receive the OTP?
        </span>

        <button
          onClick={handleResend}
          className="px-4 py-2 rounded-lg 
          bg-slate-700 hover:bg-slate-600 
          text-slate-200 text-sm font-medium 
          transition shadow-md hover:shadow-lg active:scale-95"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;