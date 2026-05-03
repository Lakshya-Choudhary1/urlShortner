import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6">
      <div className="text-center max-w-lg">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-white tracking-widest drop-shadow-lg">
          404
        </h1>

        {/* Glass Card */}
        <div className="mt-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-3">
            Page Not Found
          </h2>

          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Sorry, the page you are looking for doesn’t exist or may have been
            moved.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;