import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6
      bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px]"
    >
      <div className="text-center max-w-lg">

        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold 
          text-slate-100 tracking-widest drop-shadow-lg">
          404
        </h1>

        {/* Glass Card */}
        <div
          className="mt-6 
          bg-slate-800/60 backdrop-blur-lg 
          border border-slate-700 
          rounded-2xl p-8 shadow-2xl text-slate-200"
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-3 tracking-wide">
            Page Not Found
          </h2>

          <p className="text-slate-400 text-base leading-relaxed mb-6">
            Sorry, the page you are looking for doesn’t exist or may have been moved.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 
            rounded-xl bg-blue-600/80 hover:bg-blue-500 
            text-white font-semibold transition transform hover:scale-105 shadow-lg"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;