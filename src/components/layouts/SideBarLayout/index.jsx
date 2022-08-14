import React from "react";

export const SidebarLayout = ({ renderSideBar, children }) => {
  return (
    <div className="flex flex-no-wrap h-full w-full overflow-hidden">
      <aside className="shadow-lg" aria-label="Sidebar">
        <div className="w-80">{renderSideBar()}</div>
      </aside>
      <main className="bg-gray-200 w-full">{children}</main>
    </div>
  );
};
