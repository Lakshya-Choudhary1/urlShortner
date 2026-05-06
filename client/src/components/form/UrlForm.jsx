import React, { useState } from "react";
import { Button } from "../ui/button.jsx";
import useUrlStore from "../../store/useUrlStore.js";
import { LinkIcon } from "lucide-react";
import { BASEURL } from "../../config/config.js";

const UrlForm = () => {
  const { setUrl, submitUrl, shortUrl } = useUrlStore();

  const [url, setURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !url.trim()) {
      alert("Please enter a URL");
      return;
    }
    setUrl(url);
    await submitUrl();
  };

  return (
    <div className="w-full max-w-md 
      bg-slate-800/60 backdrop-blur-lg 
      border border-slate-700 
      rounded-2xl shadow-xl p-6 flex flex-col gap-4 text-slate-200">

      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-wide text-slate-100">
          URL Shortener
        </h2>
        <p className="text-sm text-slate-400">
          Paste your long URL below
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          required
          value={url}
          onChange={(e) => setURL(e.target.value)}
          type="text"
          placeholder="https://example.com/very-long-url"
          className="w-full bg-slate-900/60 border border-slate-700 
          rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 
          focus:border-blue-500 transition"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="relative overflow-hidden 
          bg-slate-700 hover:bg-slate-600 
          text-white py-3 text-lg rounded-lg group transition"
        >
          {/* Hover Fill Effect */}
          <span
            className="absolute inset-0 bg-blue-600 
            transform scale-y-0 origin-top 
            transition-transform duration-500 
            group-hover:scale-y-100"
          ></span>

          <span className="relative z-10 group-hover:text-white transition">
            Submit
          </span>
        </Button>
      </form>

      {/* Result */}
      {shortUrl && (
        <div className="w-full bg-slate-900/60 border border-slate-700 
          rounded-lg p-3 flex items-center justify-between gap-2">

          <a
            href={`${BASEURL}/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline flex items-center gap-2 text-sm break-all"
          >
            <LinkIcon size={16} />
            {shortUrl}
          </a>

          {/* Copy Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${BASEURL}/${shortUrl}`);
              setCopySuccess(true);
              setTimeout(() => setCopySuccess(false), 2000);
            }}
            className="text-xs bg-blue-600/80 hover:bg-blue-500 
            text-white px-3 py-1 rounded-md transition"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;