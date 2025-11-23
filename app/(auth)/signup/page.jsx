"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import signinBG from "@/app/assets/signin_up_bg.jpg";
import Image from "next/image";
import axios from "axios";
import InputCode from "../forget_pass/InputCode";
import { useDispatch } from "react-redux";
import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";

export default function page() {
  const dispatch = useDispatch();
  const [infor, setInfor] = useState({
    email: "",
    password: "",
    confirmPass: "",
    saveInfor: false,
    isVerifyEmail: false,
    code: 0,
  });
  const [isWait, setIsWait] = useState({
    sendCode: false,
    verifyCode: false,
  });
  const [seconds, setSeconds] = useState(15);
  const route = useRouter();

  const signUp = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/auth/sign_up/`, {
        email: infor.email,
        password: infor.password,
        remember: infor.saveInfor,
      }, {withCredentials: true})
      .then((rs) => {
        if (rs.data.status === "Success") {
          dispatch(setWeb({ load: true }));
          route.push("/account");
        } else {
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const sendCode = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/auth/send_code/`, {
        email: infor.email,
        type: "SignUn",
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInfor({ ...infor, isVerifyEmail: true });
          setIsWait({ ...isWait, sendCode: false });
        } else {
          dispatch(setWindowWarning({
            for: "ServerError",
            title: "Thông báo",
            content: rs.data.message ? rs.data.message : rs.data.error,
            type: "N",
            handle: "pending",
            isOpen: true,
            value: "",
          }))
          ;
          setIsWait({ ...isWait, sendCode: false });
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
          signUp();
        } else {
          dispatch(setWindowWarning({
            for: "ServerError",
            title: "Thông báo",
            content: rs.data.message ? rs.data.message : rs.data.error,
            type: "N",
            handle: "pending",
            isOpen: true,
            value: "",
          }))
          
          setIsWait({ ...isWait, verifyCode: false });
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setWeb({ load: false }));
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
        <div className="flex-[3] p-10 flex justify-center items-center">
          <div className="h-full w-full items-center justify-center flex flex-col gap-20 bg-white rounded-2xl shadow-basic">
            <div className="w-full flex flex-col items-center gap-5">
              <p className="font-bold text-[35px]">ĐĂNG KÝ</p>
              {infor.isVerifyEmail ? (
                <>
                  <p className="font-bold">Xác thực email</p>
                  <InputCode
                    disable={isWait.verifyCode}
                    numberInput={6}
                    inputChange={(value) => {
                      setInfor({ ...infor, code: value });
                    }}
                  />
                  <button
                    disabled={isWait.verifyCode || seconds > 0}
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
                    disabled={isWait.verifyCode}
                    className={
                      isWait.verifyCode
                        ? "p-3 rounded-2xl bg-white border-2 border-zinc-200 fill-zinc-400 scale-100 duration-200 ease-in"
                        : "p-3 rounded-2xl bg-[#01215C] border-2 border-[#01215C] fill-white scale-100 duration-200 ease-in hover:bg-white hover:fill-[#01215C] active:scale-95"
                    }
                    onClick={() => {
                      setInfor({ ...infor, isVerifyEmail: false });
                    }}
                  >
                    <svg
                      className="w-[40px] h-[40px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                  </button>
                  <button
                    disabled={
                      isWait.verifyCode || infor.code.toString().length < 6
                    }
                    className={
                      infor.code.toString().length === 6
                        ? !isWait.verifyCode
                          ? "w-1/2 p-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                          : "w-1/2 h-[60px] flex justify-center items-center bg-white border-2 border-[#01215C] rounded-2xl duration-200 ease-in"
                        : "w-1/2 p-3 bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl duration-200 ease-in"
                    }
                    onClick={() => {
                      setIsWait({ ...isWait, verifyCode: true });
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
              ) : (
                <>
                  <input
                    type="email"
                    className="w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow"
                    placeholder="Nhập Email"
                    value={infor.email}
                    onChange={(e) =>
                      setInfor({ ...infor, email: e.target.value })
                    }
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
                  <input
                    type="password"
                    className="w-[70%] p-3 outline-none border-2 border-[#009DFF] rounded-2xl shadow"
                    placeholder="Xác nhận mật khẩu"
                    value={infor.confirmPass}
                    onChange={(e) =>
                      setInfor({ ...infor, confirmPass: e.target.value })
                    }
                  />
                  <div className="checkbox-wrapper-2 flex w-[60%] justify-between">
                    <input
                      type="checkbox"
                      value={infor.saveInfor}
                      onClick={() =>
                        setInfor({ ...infor, saveInfor: !infor.saveInfor })
                      }
                      className="sc-gJwTLC ikxBAC"
                    />
                    <p>Ghi nhớ đăng nhập</p>
                  </div>
                  <button
                    disabled={
                      !infor.email ||
                      !infor.password ||
                      !(infor.password === infor.confirmPass) ||
                      isWait.sendCode
                    }
                    className={
                      infor.email &&
                      infor.password &&
                      infor.password === infor.confirmPass
                        ? !isWait.sendCode
                          ? "w-1/2 p-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                          : "w-1/2 h-[60px] flex justify-center items-center bg-white border-2 border-[#01215C] rounded-2xl duration-200 ease-in"
                        : "w-1/2 p-3 bg-zinc-400 text-white border-2 border-zinc-400 rounded-2xl duration-200 ease-in"
                    }
                    onClick={() => {
                      if (infor.password.length > 5) {
                        setIsWait({ ...isWait, sendCode: true });
                        sendCode();
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
                    {!isWait.sendCode ? (
                      "Xác nhận"
                    ) : (
                      <div className="relative inset-0 z-10 bg-white loader">
                        <div className="jimu-primary-loading"></div>
                      </div>
                    )}
                  </button>
                </>
              )}
            </div>
            <div className="w-full flex flex-col items-center gap-3 font-bold">
              <p>
                Đã có tài khoản.{" "}
                <button
                  onClick={() => {
                    dispatch(setWeb({ load: true }));
                    route.push("/signin");
                  }}
                  className="cursor-pointer duration-200 ease-in hover:text-[#009DFF]"
                >
                  Đăng nhập
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
          ></Image>
        </div>
      </div>
    </div>
  );
}
