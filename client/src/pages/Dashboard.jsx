import React, { useEffect, useState } from "react";
import useUrlStore from "../store/useUrlStore.js";
import Navbar from "../components/Dashboard/Navbar.jsx";
import UrlCard from "../components/Dashboard/UrlCard.jsx";
import QRModal from "../components/Dashboard/QRModal.jsx";
import EmptyState from "../components/Dashboard/EmptyState.jsx";
import Loading from "../components/Dashboard/Loading.jsx";
import Form from "../components/Dashboard/Form.jsx";

const Dashboard = () => {
  const { getAllUrl, toggleUrlStatus, allUrl, setAllUrl ,deleteUrl } =
    useUrlStore();

  const [qrcodeUrl, setQrcodeUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        await getAllUrl();
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [getAllUrl]);

  const handleDelete = async(id) =>{
    try {
      await deleteUrl(id);

    } catch (err) {
      console.error(err);
    }
  }

  const handleToggle = async (id) => {
    try {
      await toggleUrlStatus(id);

      const updatedUrls = allUrl.map((url) =>
        url._id === id
          ? { ...url, isActive: !url.isActive }
          : url
      );

      setAllUrl(updatedUrls);
    } catch (err) {
      console.error(err);
    }
  };

  const refresh = async () => {
    setLoading(true);
    await getAllUrl();
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div
      className="min-h-screen bg-slate-900
      bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)]
      bg-size-[15px_15px]
      text-slate-200"
    >
      <Navbar />

      <div className="w-full flex justify-center items-center px-4 mt-6">
        <Form />
      </div>

      <QRModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        qrcodeUrl={qrcodeUrl}
      />

      <div
        className="mx-2 md:mx-6 bg-slate-800/60 backdrop-blur-lg
        border border-slate-700 shadow-xl rounded-2xl
        p-4 md:p-6 mt-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            📊 Dashboard
          </h1>

          <button
            onClick={refresh}
            className="px-4 py-2 bg-slate-700
            hover:bg-slate-600 rounded-xl transition"
          >
            Refresh
          </button>
        </div>

        {allUrl.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {allUrl.map((url) => (
              <UrlCard
                key={url._id}
                url={url}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
                setQrcodeUrl={setQrcodeUrl}
                setOpenModal={setOpenModal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;