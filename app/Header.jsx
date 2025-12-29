"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeb } from "./store/slices/webSlice";
import { logout } from "./store/slices/userSlice";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "./store/slices/windowSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import { checkNotify } from "./store/slices/notifySlice";

export default function Header() {
  const user = useSelector((state) => state.user);
  const notify = useSelector(state => state.notify)
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();
  const route = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user.id) dispatch(checkNotify());
  }, [user]);

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
        logOut();
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

  useEffect(() => {
    if (user.id) {
      const socket = new WebSocket(
        `ws://${process.env.NEXT_PUBLIC_SERVER_IP}/ws/notify/${user.id}/`
      );

      socket.onopen = () => {
        socket.send(JSON.stringify({ state: "ready" }));
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if(data.id) dispatch(checkNotify())
      };

      socket.onerror = () => {
        dispatch(setWeb({ stateCrawl: false }));
        socket.close();
      };

      return () => socket.close();
    }
  }, [user]);

  return (
    <div className="z-10 fixed top-0 bg-white w-full flex justify-between items-center px-[10%] py-5 font-bold shadow">
      <button
        disabled={pathname === "/"}
        onClick={() => {
          route.push("/");
          dispatch(setWeb({ load: true }));
        }}
        className="text-[40px] text-[#00369A] cursor-pointer"
      >
        FUJobs
      </button>
      <div className="flex gap-5">
        <button
          disabled={pathname === "/"}
          onClick={() => {
            route.push("/");
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer px-5"
        >
          Trang chủ
        </button>
        <button
          disabled={pathname === "/notification"}
          onClick={() => {
            route.push("/notification");
            dispatch(setWeb({ load: true }));
          }}
          className="relative cursor-pointer px-5"
        >
          Thông báo
          {notify.available > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          )}
        </button>
        <button
          disabled={pathname === "/statistical"}
          onClick={() => {
            route.push("/statistical");
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer px-5"
        >
          Thống kê
        </button>
        <button
          disabled={pathname === "/about"}
          onClick={() => {
            route.push("/about");
            dispatch(setWeb({ load: true }));
          }}
          className="cursor-pointer px-5"
        >
          Về chúng tôi
        </button>
        {user.email ? (
          user.role === "Admin" ? (
            <button
              disabled={pathname.includes("/admin")}
              onClick={() => {
                route.push("/admin");
                dispatch(setWeb({ load: true }));
              }}
              className="cursor-pointer px-5"
            >
              Quản lý
            </button>
          ) : (
            <button
              disabled={pathname.includes("/account")}
              onClick={() => {
                route.push("/account");
                dispatch(setWeb({ load: true }));
              }}
              className="cursor-pointer px-5"
            >
              Tài khoản
            </button>
          )
        ) : (
          <button
            disabled={pathname === "/signin"}
            onClick={() => {
              route.push("/signin");
              dispatch(setWeb({ load: true }));
            }}
            className="cursor-pointer px-5"
          >
            Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
}
