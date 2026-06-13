import React from "react";
import {
  LogOutIcon,
  CircleUserRound,
} from "lucide-react";
import useUserStore from "@/store/useUserStore.js";

const Navbar = () => {
  const { logout, user } = useUserStore();

  return (
    <div className="w-full px-4 md:px-6 py-3 flex justify-center">
      <div
        className="max-w-6xl w-full flex justify-between items-center
        bg-slate-800/60 backdrop-blur-md border
        border-slate-700 rounded-2xl px-4 py-3"
      >
        <button
          onClick={logout}
          className="p-2 hover:bg-slate-700 rounded-lg"
        >
          <LogOutIcon className="size-5" />
        </button>

        {user?.profilePic ? (
          <img
            src={user.profilePic}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <CircleUserRound className="size-9" />
        )}
      </div>
    </div>
  );
};

export default Navbar;

