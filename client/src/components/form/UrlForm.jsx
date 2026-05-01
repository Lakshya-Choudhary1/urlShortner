import React, { useState } from "react";
import { Button } from "../ui/button.jsx";
import { useUrlStore } from "../../store/useUrlStore.js";
import { LinkIcon } from "lucide-react";
import { BASEURL } from "../../config/config.js";

const UrlForm = () => {
  const { setUrl, submitUrl, shortUrl } = useUrlStore();
  const [url, setURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!url || !url.trim()) {
      alert("Please enter a URL");
      return;
    }
    setUrl(url);
    await submitUrl();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">
      
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">URL Shortener</h2>
        <p className="text-sm text-gray-500">Paste your long URL below</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        <input
          value={url}
          onChange={(e) => setURL(e.target.value)}
          type="text"
          placeholder="https://example.com/very-long-url"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {/* Button with hover effect */}
        <Button
          type="submit"
          className="relative overflow-hidden border  py-3 text-lg rounded-lg group"
        >
          <span className="absolute 
          inset-0
          bg-blue-500 transform scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100"></span>
          <span className="relative z-10 group-hover:text-white transition">
            submit
          </span>
        </Button>
      </form>

      {/* Result */}
      {shortUrl && (
        <div className="w-full bg-gray-50 border rounded-lg p-3 flex items-center justify-between gap-2">
          
          <a
            href={`${BASEURL}${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center gap-2 text-sm break-all"
          >
            <LinkIcon size={16} />
            {shortUrl}
          </a>

          {/* Copy button */}
          <button
            onClick={() =>{
                navigator.clipboard.writeText(
                  `http://localhost:3000/${shortUrl}`
                )
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000); 
              }
            }
            className="text-xs bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;