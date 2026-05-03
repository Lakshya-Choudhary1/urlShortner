import useUserStore from '../store/useUserStore.js';
import React, { useState } from 'react';

const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const {emailVerify}= useUserStore();

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const fullOtp = otp.join('');

    if (fullOtp.length !== 4) {
      alert('OTP must be 4 digits');
      return;
    }

    console.log('Entered OTP:', fullOtp);
    emailVerify(fullOtp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3">Email Verification</h1>

        <p className="text-gray-600 mb-6">
          Enter the 4-digit OTP sent to your email.
        </p>

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
              className="w-14 h-14 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;