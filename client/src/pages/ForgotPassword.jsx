import React, { useState } from 'react';
import useUserStore from '../store/useUserStore.js';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await forgotPassword(email);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-100"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;