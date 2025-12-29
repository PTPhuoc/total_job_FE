"use client";

import React, { useEffect, useState } from "react";
import signinBG from "@/app/assets/signin_up_bg.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";

export default function page() {
  const dispatch = useDispatch();
  const [infor, setInfor] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [countRefuse, setCountRefuse] = useState({
    count: 1,
    email: "",
  });
  const [isWait, setIsWait] = useState({
    signIn: false,
  });

  const route = useRouter();

  const signIn = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_SERVER_PORT + "api/auth/sign_in/",
        {
          email: infor.email,
          password: infor.password,
          remember: infor.remember,
        },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          dispatch(setWeb({ load: true }));
          route.push("/account");
        } else {
          if (rs.data.status === "Invalid Password") {
            if (countRefuse.email === infor.email) {
              setCountRefuse({
                ...countRefuse,
                count: countRefuse.count + 1,
              });
            } else {
              setCountRefuse({
                email: infor.email,
                count: 1,
              });
            }
          }
          dispatch(
            setWindowWarning({
              for: "NotificaSignIn",
              title: "Thông báo",
              content:
                countRefuse.count < 4
                  ? rs.data.message
                    ? rs.data.message
                    : rs.data.error
                  : "Bạn đã nhập sai " +
                    countRefuse.count +
                    " lần liên tiếp. Quá 5 lần chúng tôi sẽ thực hiện khóa tài khoản",
              type: "N",
              handle: "pending",
              isOpen: true,
              value: "",
            })
          );
          setIsWait({ ...isWait, signIn: false });
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#5FB4EA]">
      <div className="w-full h-full flex">
        <div className="flex-[3] p-10 flex justify-center items-center">
          <div className="h-full w-full items-center justify-center flex flex-col gap-20 bg-white rounded-2xl shadow-basic">
            <div className="w-full flex flex-col items-center gap-5">
              <p className="font-bold text-[35px]">ĐĂNG NHẬP</p>
              <input
                type="text"
                className="w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow"
                placeholder="Nhập Email"
                value={infor.email}
                onChange={(e) => setInfor({ ...infor, email: e.target.value })}
              />
              <input
                type="password"
                className="w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow"
                placeholder="Nhập Mật khẩu"
                value={infor.password}
                onChange={(e) =>
                  setInfor({ ...infor, password: e.target.value })
                }
              />
              <div className="checkbox-wrapper-2 flex w-[60%] justify-between">
                <input
                  type="checkbox"
                  value={infor.remember}
                  onClick={() =>
                    setInfor({ ...infor, remember: !infor.remember })
                  }
                  className="sc-gJwTLC ikxBAC"
                />
                <p>Ghi nhớ đăng nhập</p>
              </div>
              <button
                disabled={(!infor.email && !infor.password) || isWait.signIn}
                className={
                  infor.email && infor.password
                    ? !isWait.signIn
                      ? "w-1/2 p-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                      : "w-1/2 h-[60px] flex justify-center items-center bg-white border-2 border-[#01215C] rounded-2xl duration-200 ease-in"
                    : "w-1/2 p-3 bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl duration-200 ease-in"
                }
                onClick={() => {
                  setIsWait({ ...isWait, signIn: true });
                  signIn();
                }}
              >
                {!isWait.signIn ? (
                  "Xác nhận"
                ) : (
                  <div className="relative inset-0 z-10 bg-white loader">
                    <div className="jimu-primary-loading"></div>
                  </div>
                )}
              </button>
            </div>
            <div className="w-full flex flex-col items-center gap-3 font-bold">
              <p>
                Quên mật khẩu.{" "}
                <button
                  onClick={() => {
                    dispatch(setWeb({ load: true }));
                    route.push("/forget_pass");
                  }}
                  className="cursor-pointer duration-200 ease-in hover:text-[#009DFF]"
                >
                  Lấy lại mật khẩu
                </button>
              </p>
              <p>
                Chưa có tài khoản.{" "}
                <button
                  onClick={() => {
                    dispatch(setWeb({ load: true }));
                    route.push("/signup");
                  }}
                  className="cursor-pointer duration-200 ease-in hover:text-[#009DFF]"
                >
                  Đăng ký
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-[7]">
          <Image
            className="w-full h-full object-cover"
            alt=""
            src={signinBG}
            priority
          ></Image>
        </div>
      </div>
    </div>
  );
}
