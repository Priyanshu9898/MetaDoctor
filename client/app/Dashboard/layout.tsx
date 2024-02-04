"use client";

import React, { ReactNode, useState } from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <>
      <div className="flex flex-col h-screen">
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-row min-w-full h-screen">
          <DashboardSidebar isCollapsed={isSidebarCollapsed} />

          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
