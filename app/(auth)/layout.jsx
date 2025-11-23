"use client"

import React from "react";
import { useSelector } from "react-redux";
import WindowShow from "../WindowShow";

export default function AuthLayout({ children }) {
  const isWeb = useSelector((state) => state.web);
  const windowWarning = useSelector((state) => state.windowWarning);
  return (
    <>
      {isWeb.load && (
        <div className="fixed inset-0 z-50 bg-white loader">
          <div className="jimu-primary-loading"></div>
        </div>
      )}
      {windowWarning.isOpen && <WindowShow />}
      {children}
    </>
  );
}
