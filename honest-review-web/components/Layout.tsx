import React from "react";
import { NavBar } from "./NavBar";

export const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="w-full h-full">
        {children}
      </div>
      {/* <Wrapper variant={variant}></Wrapper> */}
    </>
  );
};
