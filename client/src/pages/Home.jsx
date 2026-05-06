import React, { useState } from "react";
import PostUrlShortFree from "@/components/form/UrlForm.jsx";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="w-screen min-h-screen 
      bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px] text-slate-200 relative"
    >

      <p className="absolute bottom-2 w-full text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Lakshya Choudhary. All rights reserved.
      </p>

      {/* Navbar */}
      <nav className="w-full flex justify-center px-4 pt-4">
        <div
          className="w-full max-w-6xl flex items-center justify-between 
          bg-slate-800/60 backdrop-blur-md border border-slate-700 
          rounded-2xl px-6 py-3"
        >
          {/* Logo */}
          <h1 className="font-bold text-slate-100 text-xl md:text-2xl tracking-wide">
            Short
            <span className="text-blue-400">Link</span>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 font-medium text-slate-300">
            <Link className="hover:text-white transition" to="/">
              Home
            </Link>
            <Link className="hover:text-white transition" to="/contact">
              Contact
            </Link>
            <Link className="hover:text-white transition" to="/login">
              Login
            </Link>
            <Link
              className="bg-blue-600/80 hover:bg-blue-500 
              text-white px-4 py-2 rounded-lg transition"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>

          {/* Burger */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div
          className="flex flex-col gap-4 font-medium text-slate-300 
          bg-slate-800/60 backdrop-blur-md border border-slate-700 
          rounded-2xl p-4"
        >
          <Link onClick={() => setMenuOpen(false)} className="hover:text-white" to="/">
            Home
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-white" to="/contact">
            Contact
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-white" to="/login">
            Login
          </Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-white" to="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center mt-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-wide">
          Shorten Your Links Instantly 🚀
        </h1>
        <p className="text-slate-400 mt-3 max-w-lg">
          Fast, secure, and easy URL shortening. Manage, track, and share your links effortlessly.
        </p>
      </div>

      {/* Form */}
      <div className="flex justify-center items-center mt-10 px-4">
        <PostUrlShortFree />
      </div>
    </div>
  );
};

export default Home;