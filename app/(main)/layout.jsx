"use client";

import React from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import WindowShow from "../WindowShow";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  const isWeb = useSelector((state) => state.web);
  const windowWarning = useSelector((state) => state.windowWarning);
  return (
    <>
      {isWeb.load && (
        <div className="fixed inset-0 z-50 bg-white loader">
          <div className="jimu-primary-loading"></div>
        </div>
      )}
      <Header></Header>
      {windowWarning.isOpen && <WindowShow />}
      {children}
      <Footer></Footer>
    </>
  );
}
