import React from "react";
import { LinkIcon, Copy } from "lucide-react";
import { BASEURL } from "@/config/config.js";
import QRCODE from "qrcode";
import toast from "react-hot-toast";

const UrlCard = ({ url, handleToggle, setQrcodeUrl, setOpenModal ,handleDelete }) => {
  const shortLink = `${BASEURL}/${url.shortUrl}`;

  const copyUrl = async () => {
    await navigator.clipboard.writeText(shortLink);
    toast.success("Copied!");
  };

  const generateQrcode = async () => {
    try {
      const qrUrl = await QRCODE.toDataURL(shortLink);

      setQrcodeUrl(qrUrl);
      setOpenModal(true);
    } catch (err) {
      toast.error("QR generation failed");
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row justify-between
      gap-4 bg-slate-900/60 border border-slate-700
      p-4 rounded-2xl hover:bg-slate-800/70 transition"
    >
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex gap-3">
          <a
            href={shortLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline
          flex items-center gap-2 text-sm break-all"
          >
            <LinkIcon size={16} />
            {shortLink}
          </a>
          <span
            className={`px-3 py-1 flex items-center justify-center
               rounded-full text-xs border ${
              url.isActive
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }`}
          >
            {url.isActive ? "Active" : "Inactive"}
          </span>
          <button
          onClick={copyUrl}
          className="p-2 bg-slate-700 hover:bg-slate-600
          rounded-lg transition"
        >
          <Copy size={18} />
        </button>
        </div>

        <p className="text-sm text-slate-400 break-all mt-1 max-w-sm  md:max-w-md">
          {url.originalUrl}
        </p>

        <p className="text-xs text-slate-500 mt-2">
          Created: {new Date(url.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm">{url.clicks} Clicks</span>

        <button
          onClick={() => handleToggle(url._id)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500
          rounded-lg transition"
        >
          Toggle
        </button>

        

        <button
          onClick={generateQrcode}
          className="px-4 py-2 bg-green-600 hover:bg-green-500
          rounded-lg transition"
        >
          QR Code
        </button>

        <button
          onClick={()=>handleDelete(url._id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-500
          rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UrlCard;
