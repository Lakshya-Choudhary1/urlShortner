import React, { useEffect, useState } from "react";
import useUrlStore from "../store/useUrlStore.js";
import { LogOutIcon, CircleUserRound, LinkIcon, X } from "lucide-react";
import useUserStore from "../store/useUserStore.js";
import Form from "@/components/Dashboard/Form.jsx";
import { BASEURL } from "@/config/config.js";
import QRCODE from "qrcode";

const Dashboard = () => {
  const { getAllUrl, toggleUrlStatus, allUrl, setAllUrl } = useUrlStore();
  const { logout, user } = useUserStore();

  const [qrcodeUrl, setQrcodeUrl] = useState("");
  const [openModel, setOpenModel] = useState(false);

  useEffect(() => {
    getAllUrl();
  }, []);

  const handleToggle = async (id) => {
    await toggleUrlStatus(id);

    const updatedUrls = allUrl.map((url) =>
      url._id === id ? { ...url, isActive: !url.isActive } : url
    );

    setAllUrl(updatedUrls);
  };
  const refresh = ()=>{
    getAllUrl();
  }

  const generateQrcode = async (shortUrl) => {
    try {
      const qrUrl = await QRCODE.toDataURL(shortUrl);
      setQrcodeUrl(qrUrl);
      setOpenModel(true);
    } catch (err) {
      console.error("QR generation failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px] w-full relative text-slate-200">

      {/* Navbar */}
      <div className="w-full px-6 py-2 mb-6 flex justify-center items-center">
        <div className="max-w-6xl w-full flex justify-between items-center 
          bg-slate-800/60 backdrop-blur-md border border-slate-700 
          rounded-2xl px-6 py-2">

          <button className="p-2 hover:bg-slate-700 rounded-lg" onClick={logout}>
            <LogOutIcon className="size-5 text-slate-200" />
          </button>

          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border border-slate-600"
            />
          ) : (
            <CircleUserRound className="text-slate-300" />
          )}
        </div>
      </div>

      {/* Form + Modal */}
      <div className="w-full flex justify-center gap-4 items-center flex-col md:flex-row">
        <Form />

        {/* QR Modal */}
        <div className={`fixed inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm ${openModel ? "" : "hidden"}`}>
          <div className="bg-slate-800 border border-slate-700 p-10 rounded-xl relative shadow-xl">
            <X
              size={22}
              className="absolute top-2 right-2 cursor-pointer text-slate-300 hover:text-white"
              onClick={() => setOpenModel(false)}
            />
            <img src={qrcodeUrl} className="w-60 h-60 rounded-lg" />
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = qrcodeUrl;
              link.download = "qr-code.png";
              link.click();
          }}
            className="px-4 py-2 w-full text-center mt-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition"
          >
              Download QR
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="mx-2 bg-slate-800/60 backdrop-blur-lg border border-slate-700 
        shadow-xl rounded-2xl p-6 mt-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-100 tracking-wide">
            📊 Dashboard
          </h1>

          <button onClick={refresh} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition">
            Refresh
          </button>
        </div>

        {allUrl.length === 0 ? (
          <p className="text-slate-400">No URLs found.</p>
        ) : (
          <div className="space-y-4">
            {allUrl.map((url) => (
              <div
                key={url._id}
                className="flex items-center justify-between 
                bg-slate-900/60 border border-slate-700 
                p-4 rounded-xl hover:bg-slate-800/70 transition 
                flex-col lg:flex-row gap-2"
              >
                {/* URL Info */}
                <div className="flex w-full flex-col flex-1">
                  <a
                    href={`${BASEURL}/${url.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-2 text-sm break-all"
                  >
                    <LinkIcon size={16} />
                    {url.shortUrl}
                  </a>

                  <p className="text-sm text-slate-400 break-all">
                    {url.originalUrl}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-1 items-center gap-4 justify-center lg:justify-end flex-wrap">
                  <p className="text-slate-300 text-sm">
                    clicks: {url.clicks}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      url.isActive
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {url.isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => handleToggle(url._id)}
                    className="px-4 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded-lg transition"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() =>
                      generateQrcode(`${BASEURL}/${url.shortUrl}`)
                    }
                    className="px-4 py-2 bg-rose-600/80 hover:bg-rose-500 text-white rounded-lg transition"
                  >
                    QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;