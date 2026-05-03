import useUserStore from '@/store/useUserStore.js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { resetPasswordToken } = useParams();
  const [password, setPassword] = useState('');

  const { resetPassword } = useUserStore();
     const navigate = useNavigate();

  const handleSubmit = async (e) => {
     e.preventDefault()
    await resetPassword(password, resetPasswordToken);
    navigate('/login')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-100"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4 outline-none"
          required
          minLength={6}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;