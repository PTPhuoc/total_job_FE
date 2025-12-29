"use client";

import React, { useEffect } from "react";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import WindowShow from "../WindowShow";
import Footer from "../Footer";
import { decodeToken } from "../store/slices/userSlice";

export default function MainLayout({ children }) {
  const isWeb = useSelector((state) => state.web);
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(decodeToken());
  }, []);

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
