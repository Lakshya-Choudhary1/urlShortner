import React, { useEffect } from "react";
import useUrlStore from "../store/useUrlStore.js";
import {LogOutIcon,CircleUserRound,LinkIcon} from "lucide-react"
import useUserStore from "../store/useUserStore.js";
import Form from "@/components/Dashboard/Form.jsx";
import { BASEURL } from "@/config/config.js";

const Dashboard = () => {
  const { getAllUrl, toggleUrlStatus, allUrl, setAllUrl } = useUrlStore();
  const {logout,user} = useUserStore();

  useEffect(() => {
    const fetchUrls = async () => {
      await getAllUrl();
    };
    fetchUrls();
  }, []);

  const handleToggle = async (id) => {
    await toggleUrlStatus(id);

    // create new updated array (avoid direct mutation)
    const updatedUrls = allUrl.map((url) =>
      url._id === id ? { ...url, isActive: !url.isActive } : url
    );

    setAllUrl(updatedUrls);
  };

  const handleLogout = () =>{
     logout();
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      
      <div className="w-full px-6 py-2 bg-gray-500 mb-6">
        <div className="w-full flex justify-between items-center">
            <button className="p-2" onClick={handleLogout}>
              <LogOutIcon className="size-5 text-2xl text-white"/>
            </button>

            {user.profilePic ? <img 
              src={user.profilePic} alt="profile" className="w-10 h-10 rounded-full object-cover"
            /> : <CircleUserRound className="text-white"/>}
           

        </div>
      </div>

      <div className="w-full  flex justify-center items-center">
          <Form/>
      </div>
      
      
      <div className="w-contain mx-2  bg-white shadow-lg rounded-2xl p-6 mt-6">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          📊 Dashboard
        </h1>

        {allUrl.length === 0 ? (
          <p className="text-gray-500">No URLs found.</p>
        ) : (
          <div className="space-y-4">
            {allUrl.map((url) => (
              <div
                key={url._id}
                className="flex items-center justify-between border p-4 rounded-xl hover:shadow-md transition"
              >
                <div>
                  <div>

                  
                    <a href={`${BASEURL}/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline hover:text-lg  flex items-center gap-2 text-sm break-all duration-300 ease-in-out">
                        <LinkIcon size={16} />
                        {url.shortUrl}
                    </a>
                  </div>
                  <p className="text-sm text-gray-500 break-all">
                    {url.originalUrl}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-gray-800 hover:text-lg  gap-2  break-all duration-300 ease-in-out">clicks : {url.clicks}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      url.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {url.isActive ? "Active" : "Inactive"}
                  </span>

                  <button
                    onClick={() => handleToggle(url._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Toggle
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