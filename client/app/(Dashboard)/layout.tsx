import React, { ReactNode } from "react";
import DashboardNavbar from "./components/DashboardNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
};

export default layout;
