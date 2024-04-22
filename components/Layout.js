"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import GlobalState from "@/context/GlobalState";
import Footer from "./Footer";
import { Spacer } from "@nextui-org/react";

function Layout({ children }) {
  const [url, setUrl] = useState("");
  return (
    <>
      <GlobalState.Provider
        value={{
          url,
          setUrl,
        }}
      >
        <Navbar />
        <div className="min-h-screen">{children}</div>
        <Spacer y={100} />
        <Footer />
      </GlobalState.Provider>
    </>
  );
}

export default Layout;
