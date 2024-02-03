"use client";

import React, { useState } from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <>
      <div className="flex flex-col h-screen">
        <DashboardNavbar toggleSidebar={toggleSidebar} />

        <DashboardSidebar isCollapsed={isSidebarCollapsed} />
      </div>
    </>
  );
};

export default Dashboard;
