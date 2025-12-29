"use client";

import React, { useEffect, useState } from "react";
import signinBG from "@/app/assets/signin_up_bg.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputCode from "./InputCode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";

export default function page() {
  const dispatch = useDispatch()
  const [infor, setInfor] = useState({
    email: "",
    code: 0,
    password: "",
    confirmPass: "",
  });
  const [isForget, setIsForget] = useState({
    isEmail: false,
    isCode: false,
  });

  const [isWait, setIsWait] = useState({
    isEmail: false,
    isCode: false,
    isVerify: false,
  });
  const [seconds, setSeconds] = useState(15);
  const router = useRouter();

  const sendCode = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/auth/send_code/`, {
        email: infor.email,
        type: "Forgot",
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setIsForget({ ...isForget, isEmail: true });
          setIsWait({ ...isWait, isEmail: false });
        } else {
          setWindowWarning({
            for: "ServerError",
            title: "Thông báo",
            content: rs.data.message ? rs.data.message : rs.data.error,
            type: "N",
            handle: "pending",
            isOpen: true,
            value: "",
          });
          setIsWait({ ...isWait, isEmail: false });
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const verifyCode = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/auth/verify_code/`, {
        email: infor.email,
        code: infor.code.toString(),
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setIsForget({ ...isForget, isCode: true });
          setIsWait({ ...isWait, isCode: false });
        } else {
          setWindowWarning({
            for: "ServerError",
            title: "Thông báo",
            content: rs.data.message ? rs.data.message : rs.data.error,
            type: "N",
            handle: "pending",
            isOpen: true,
            value: "",
          });
          setIsWait({ ...isWait, isVerify: false });
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const changePass = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/auth/change_password_forget/`, {
        email: infor.email,
        password: infor.password,
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          dispatch(setWeb({load: true}))
          dispatch(setWindowWarning({
            for: "SuccessChangePass",
            title: "Thông báo",
            content: "Đổi mật khẩu thành công. Hãy đăng nhập lại!",
            type: "N",
            handle: "pending",
            isOpen: true,
            value: "",
          }))
          ;
          router.push("/signin");
        } else {
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setWeb({load: false}));
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-[#5FB4EA]">
      <div className="w-full h-full flex">
        <div className="flex-[3] min-w-0 p-10 flex justify-center items-center">
          <div className="h-full w-full items-center justify-center flex flex-col gap-20 bg-white rounded-2xl shadow-2xl">
            <div className="w-full flex flex-col items-center gap-5">
              <p className="font-bold text-[35px]">LẤY LẠI MẬT KHẨU</p>
              <input
                disabled={isForget.isEmail}
                type="text"
                className={
                  isForget.isEmail
                    ? "w-[70%] p-3 outline-none bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl shadow duration-200 ease-in"
                    : "w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow duration-200 ease-in"
                }
                placeholder="Nhập Email"
                value={infor.email}
                onChange={(e) => setInfor({ ...infor, email: e.target.value })}
              />
              {isForget.isEmail ? (
                isForget.isCode ? (
                  <>
                    <input
                      type="password"
                      className="w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow"
                      placeholder="Nhập Mật khẩu"
                      value={infor.password}
                      onChange={(e) =>
                        setInfor({ ...infor, password: e.target.value })
                      }
                    />
                    <input
                      type="password"
                      className="w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow"
                      placeholder="Xác nhận mật khẩu"
                      value={infor.confirmPass}
                      onChange={(e) =>
                        setInfor({ ...infor, confirmPass: e.target.value })
                      }
                    />
                    <button
                      disabled={
                        !infor.password ||
                        !(infor.password === infor.confirmPass)
                      }
                      className={
                        infor.password && infor.password === infor.confirmPass
                          ? "w-1/2 p-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                          : "w-1/2 p-3 bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl duration-200 ease-in"
                      }
                      onClick={() => {
                        if (infor.password.length > 5) {
                          changePass();
                        } else {
                          setWindowWarning({
                            for: "PasswordLength",
                            title: "Yêu cầu",
                            content: "Mật khẩu phải trên 6 ký tự",
                            type: "N",
                            handle: "pending",
                            isOpen: true,
                            value: "",
                          });
                        }
                      }}
                    >
                      Xác nhận
                    </button>
                  </>
                ) : (
                  <>
                    <InputCode
                      disable={isWait.isCode}
                      numberInput={6}
                      inputChange={(value) => {
                        if (!isNaN(value)) {
                          setInfor({ ...infor, code: value });
                        }
                      }}
                    />
                    <button
                    disabled={isWait.isVerify || seconds > 0}
                    className={
                      isWait.verifyCode || seconds > 0
                        ? "text-zinc-400"
                        : "cursor-pointer duration-200 ease-in hover:text-[#009DFF]"
                    }
                    onClick={() => {
                      sendCode();
                      setSeconds(15);
                    }}
                  >
                    Gửi lại mã. {seconds > 0 && seconds + "s"}
                  </button>
                    <button
                    disabled={
                      isWait.isVerify || infor.code.toString().length < 6
                    }
                    className={
                      infor.code.toString().length === 6
                        ? !isWait.isVerify
                          ? "w-1/2 p-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                          : "w-1/2 h-[60px] flex justify-center items-center bg-white border-2 border-[#01215C] rounded-2xl duration-200 ease-in"
                        : "w-1/2 p-3 bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl duration-200 ease-in"
                    }
                    onClick={() => {
                      setIsWait({ ...isWait, isVerify: true });
                      verifyCode();
                    }}
                  >
                    {!isWait.verifyCode ? (
                      "Xác nhận"
                    ) : (
                      <div className="relative inset-0 z-10 bg-white loader">
                        <div className="jimu-primary-loading"></div>
                      </div>
                    )}
                  </button>
                  </>
                )
              ) : (
                <button
                  disabled={!infor.email || isWait.isEmail}
                  className={
                    infor.email
                      ? !isWait.isEmail
                        ? "w-1/2 p-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                        : "w-1/2 h-[60px] flex justify-center items-center bg-white border-2 border-[#01215C] rounded-2xl duration-200 ease-in"
                      : "w-1/2 p-3 bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl duration-200 ease-in"
                  }
                  onClick={() => {
                    setIsWait({ ...isWait, isEmail: true });
                    sendCode();
                  }}
                >
                  {!isWait.isEmail ? (
                    "Xác nhận"
                  ) : (
                    <div className="relative inset-0 z-10 bg-white loader">
                      <div className="jimu-primary-loading"></div>
                    </div>
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex flex-col items-center gap-3 font-bold">
              <button
                onClick={() => {
                  dispatch(setLoad(true))
                  router.push("/signin");
                }}
                className="cursor-pointer duration-200 ease-in hover:text-[#009DFF]"
              >
                Quay về đăng nhập
              </button>
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
