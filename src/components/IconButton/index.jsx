import React from "react";

export const IconButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      class="hover:text-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
    >
      {icon}
      {label && <span className="sr-only">Icon description</span>}
    </button>
  );
};
