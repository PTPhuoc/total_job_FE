"use client";

import React from "react";
import Image from "next/image";
import AccountImage1 from "@/app/assets/Image_Account_1.jpg";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setWindowWarning } from "@/app/store/slices/windowSlice";

export default function MenuBar() {
  const dispatch = useDispatch();
  const pathUrl = usePathname();
  const route = useRouter();
  return (
    <>
      <div className="flex flex-col gap-5 items-stretch">
        <Image
          src={AccountImage1}
          alt="ImageAccount1"
          className="object-contain rounded-2xl shadow-basic"
          priority
        />
        <button
          disabled={pathUrl === "/account/candidate"}
          className={
            pathUrl === "/account/candidate"
              ? "flex items-center gap-3 py-1 px-3 bg-white text-[#009DFF] fill-[#009DFF] border-2 border-white rounded-lg shadow-basic"
              : "flex gap-3 py-1 px-3 fill-white text-white bg-[#009DFF] items-center border-2 border-white rounded-lg shadow-basic duration-200 ease-in hover:bg-white hover:fill-[#009DFF] hover:text-[#009DFF]"
          }
          onClick={() => {
            route.push("/account/candidate");
          }}
        >
          <div className="flex items-center justify-center w-[30px] h-[30px]">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
          </div>
          <p className="font-bold">Thông tin cá nhân</p>
        </button>
        <button
          disabled={pathUrl === "/account/candidate/save_job"}
          className={
            pathUrl === "/account/candidate/save_job"
              ? "flex items-center gap-3 py-1 px-3 bg-white text-[#009DFF] fill-[#009DFF] border-2 border-white rounded-lg shadow-basic"
              : "flex gap-3 py-1 px-3 fill-white text-white bg-[#009DFF] items-center border-2 border-white rounded-lg shadow-basic duration-200 ease-in hover:bg-white hover:fill-[#009DFF] hover:text-[#009DFF]"
          }
          onClick={() => {
            route.push("/account/candidate/save_job");
          }}
        >
          <div className="flex items-center justify-center w-[30px] h-[30px]">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
          </div>
          <p className="font-bold">Tuyển dụng đã lưu</p>
        </button>
        <button
          disabled={pathUrl === "/account/candidate/save_company"}
          className={
            pathUrl === "/account/candidate/save_company"
              ? "flex items-center gap-3 py-1 px-3 bg-white text-[#009DFF] fill-[#009DFF] border-2 border-white rounded-lg shadow-basic"
              : "flex gap-3 py-1 px-3 fill-white text-white bg-[#009DFF] items-center border-2 border-white rounded-lg shadow-basic duration-200 ease-in hover:bg-white hover:fill-[#009DFF] hover:text-[#009DFF]"
          }
          onClick={() => {
            route.push("/account/candidate/save_company");
          }}
        >
          <div className="flex items-center justify-center w-[30px] h-[30px]">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
          </div>
          <p className="font-bold">Công ty đã theo dõi</p>
        </button>
        <button
          disabled={pathUrl === "/account/candidate/apply"}
          className={
            pathUrl === "/account/candidate/apply"
              ? "flex items-center gap-3 py-1 px-3 bg-white text-[#009DFF] fill-[#009DFF] border-2 border-white rounded-lg shadow-basic"
              : "flex gap-3 py-1 px-3 fill-white text-white bg-[#009DFF] items-center border-2 border-white rounded-lg shadow-basic duration-200 ease-in hover:bg-white hover:fill-[#009DFF] hover:text-[#009DFF]"
          }
          onClick={() => {
            route.push("/account/candidate/apply");
          }}
        >
          <div className="flex items-center justify-center w-[30px] h-[30px]">
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 256a256 256 0 1 0 512 0 256 256 0 1 0 -512 0zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
          </div>
          <p className="font-bold">Tuyển dụng đã ứng tuyển</p>
        </button>
      </div>
      <div className="flex flex-col gap-5 items-stretch">
        <button
          className="flex gap-3 py-1 px-3 text-white font-bold bg-red-500 items-center rounded-lg border-2 border-red-500 shadow-basic duration-200 ease-in hover:bg-white hover:text-red-500"
          onClick={() => {
            dispatch(
              setWindowWarning({
                for: "LogOut",
                title: "Đăng xuất",
                content: "Bạn có chắc muốn đăng xuất",
                handle: "pending",
                type: "YorN",
                isOpen: true,
                value: "",
              })
            );
          }}
        >
          Đăng xuất
        </button>
      </div>
    </>
  );
}
