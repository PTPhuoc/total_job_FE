"use client";

import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import WindowShow from "./WindowShow";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function RootPage({ children }) {
  const isWeb = useSelector((state) => state.web);
  const windowWarning = useSelector((state) => state.windowWarning);
  const pathname = usePathname()

  return (
    <>
      {isWeb.load && (
        <div className="fixed inset-0 z-50 bg-white loader">
          <div className="jimu-primary-loading"></div>
        </div>
      )}
      {!["/signin", "/signup", "/forget_pass"].includes(pathname) && <Header />}
      {windowWarning.isOpen && <WindowShow />}
      {children}
      {!["/signin", "/signup", "/forget_pass"].includes(pathname) && <Footer />}
    </>
  );
}
