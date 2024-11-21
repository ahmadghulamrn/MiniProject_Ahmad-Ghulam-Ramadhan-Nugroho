import React from "react";
import Navbar from "../Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="app pb-12">
        <Navbar />
        {children}
      </main>
    </>
  );
};
