"use client";

import React, { useState } from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHome from "./components/DashboardHome";

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <>
      <div className="flex flex-col h-screen">
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-row w-full h-screen">
          <DashboardSidebar isCollapsed={isSidebarCollapsed} />
          <DashboardHome />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
