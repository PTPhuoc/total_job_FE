"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeb } from "./store/slices/webSlice";
import { decodeToken, logout } from "./store/slices/userSlice";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "./store/slices/windowSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";

export default function Header() {
  const user = useSelector((state) => state.user);
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(decodeToken());
  }, []);

  useEffect(() => {
    if (user.expiresIn <= 0) return;
    const expiresAt = Date.now() + user.expiresIn * 1000;

    const interval = setInterval(() => {
      const remaining = Math.floor((expiresAt - Date.now()) / 1000);
      if (remaining <= 0) {
        dispatch(logout());
        dispatch(
          setWindowWarning({
            for: "ExpiredToken",
            title: "Phiên đăng nhập hết hạn",
            content: "Phiên đăng nhập của bạn đã hết hạn. hãy đăng nhập lại!",
            handle: "pending",
            type: "N",
            isOpen: true,
            value: "",
          })
        );
        if (["/account", "/admin"].includes(pathname)) {
          route.push("/signin");
        }
        clearInterval(interval);
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user.expiresIn]);

  const logOut = () => {
    try {
      axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/auth/log_out/`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (windowWarning.handle === "accept") {
      if (windowWarning.for === "LogOut") {
        logOut()
        dispatch(logout());
        dispatch(setWeb({ load: true }));
        route.push("/signin");
      }
      dispatch(setDefaultWindowWarning());
    } else if (windowWarning.for === "Expired Token") {
      dispatch(logout());
      dispatch(setWeb({ load: true }));
      route.push("/signin");
    }
  }, [windowWarning]);

  return (
    <div className="z-10 fixed top-0 bg-white w-full flex justify-between items-center px-[10%] py-5 font-bold shadow">
      <button
        disabled={pathname === "/"}
        onClick={() => {
          route.push("/")
          dispatch(setWeb({ load: true }));
        }}
        className="text-[40px] text-[#00369A] cursor-pointer"
      >
        FUJobs
      </button>
      <div className="flex gap-14">
        <button
          disabled={pathname === "/"}
          onClick={() => {
            route.push("/")
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer"
        >
          Trang chủ
        </button>
        <button
          disabled={pathname === "/notification"}
          onClick={() => {
            route.push("/notification")
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer"
        >
          Thông báo
        </button>
        <button
          disabled={pathname === "/statistical"}
          onClick={() => {
            route.push("/statistical")
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer"
        >
          Thống kê
        </button>
        <button
          disabled={pathname ===  "/about"}
          onClick={() => {
            route.push("/about")
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer"
        >
          Về chúng tôi
        </button>
        {user.email ? (
          user.role === "Admin" ? (
            <button
              disabled={pathname.includes("/admin")}
              onClick={() => {
                route.push("/admin")
                dispatch(setWeb({ load: true }));
              }}
              className="cursor-pointer"
            >
              Quản lý
            </button>
          ) : (
            <button
              disabled={pathname.includes("/account")}
              onClick={() => {
                route.push("/account")
                dispatch(setWeb({ load: true }));
              }}
              className="cursor-pointer"
            >
              Tài khoản
            </button>
          )
        ) : (
          <button
            disabled={pathname === "/signin"}
            onClick={() => {
              route.push("/signin")
              dispatch(setWeb({ load: true }));
            }}
            className="cursor-pointer"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
}
