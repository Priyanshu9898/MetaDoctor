import React, { ReactNode } from "react";
import AuthNavbar from "./AuthNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <AuthNavbar />
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  );
};

export default layout;
