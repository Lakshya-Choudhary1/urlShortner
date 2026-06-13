import React from "react";
import { X } from "lucide-react";

const QRModal = ({
  openModal,
  setOpenModal,
  qrcodeUrl,
}) => {
  return (
    <div
      onClick={() => setOpenModal(false)}
      className={`fixed inset-0 z-50 flex items-center
      justify-center bg-black/60 backdrop-blur-sm
      ${openModal ? "" : "hidden"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 border border-slate-700
        p-6 rounded-2xl relative"
      >
        <X
          size={22}
          className="absolute top-3 right-3 cursor-pointer"
          onClick={() => setOpenModal(false)}
        />

        <img
          src={qrcodeUrl}
          alt="QR Code"
          className="w-64 h-64 rounded-lg"
        />

        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = qrcodeUrl;
            link.download = "qr-code.png";
            link.click();
          }}
          className="w-full mt-4 px-4 py-2
          bg-emerald-600 hover:bg-emerald-500
          rounded-lg transition"
        >
          Download QR
        </button>
      </div>
    </div>
  );
};

export default QRModal;