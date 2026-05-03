import React, { useState } from "react";
import { BASEURL } from "@/config/config.js";
import useUserStore from "@/store/useUserStore.js";
import {Link} from "react-router-dom";

const Login = () => {

  const {login} = useUserStore();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    await login(formData);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
         
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />


          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
          <div className="flex gap-3 justify-center "> 
            <p className="text-md text-slate-700">Don't have an account?</p>
            <Link  to={"/signup"} className="text-md text-blue-700">SignUp</Link>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* Google OAuth */}
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

         <div className="flex gap-3 justify-center mt-3 "> 
            <p className="text-md text-slate-700">Don't remember the password?</p>
            <Link  to={"/forgotPassword"} className="text-md text-blue-700">Forgot Password</Link>
        </div>     
      </div>
      
    </div>
  );
};

export default Login;