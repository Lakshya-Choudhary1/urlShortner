import React from "react";
import { LinkIcon } from "lucide-react";

const EmptyState = () => {
  return (
    <div
      className="flex flex-col items-center
      justify-center py-16 text-slate-400"
    >
      <LinkIcon size={48} />

      <p className="mt-4 text-lg">
        No shortened URLs yet
      </p>
    </div>
  );
};

export default EmptyState;