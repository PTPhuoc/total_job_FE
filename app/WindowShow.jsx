"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "./store/slices/windowSlice";

export default function WindowShow() {
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();
  return (
    <div className="fixed flex w-full h-screen z-50 bg-[rgba(255,255,255,0.7)] justify-center items-center">
      <div className="w-1/3 h-1/2 bg-white shadow rounded-2xl flex flex-col items-center overflow-hidden">
        <div className="flex-[2] px-5 w-full flex justify-between items-center bg-[#009DFF]">
          <p className="text-white">{windowWarning.title}</p>
          {windowWarning.type !== "Y" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDefaultWindowWarning());
              }}
              className="w-[40px] h-[40px] fill-[#01215C] scale-100 duration-200 ease-in hover:fill-white active:scale-95"
            >
              <svg
                className="w-[40px] h-[40px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex-[8] w-full flex justify-center items-center px-5">
          <p>{windowWarning.content}</p>
        </div>
        <div className="flex-[2] p-5 w-full flex gap-10 justify-center">
          {windowWarning.type === "YorN" ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setDefaultWindowWarning());
                }}
                className="w-1/3 bg-[#01215C] text-white rounded-2xl border-2 border-[#01215C] scale-100 hover:bg-white hover:text-[#01215C] active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    setWindowWarning({
                      handle: "accept",
                      isOpen: false,
                    })
                  );
                }}
                className="w-1/3 bg-[#01215C] text-white rounded-2xl border-2 border-[#01215C] scale-100 hover:bg-white hover:text-[#01215C] active:scale-95"
              >
                Đồng ý
              </button>
            </>
          ) : windowWarning.type === "N" ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setDefaultWindowWarning());
              }}
              className="w-1/3 bg-[#01215C] text-white rounded-2xl border-2 border-[#01215C] scale-100 hover:bg-white hover:text-[#01215C] active:scale-95"
            >
              Đóng
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  setWindowWarning({
                    handle: "accept",
                    isOpen: false,
                  })
                );
              }}
              className="w-1/3 bg-[#01215C] text-white rounded-2xl border-2 border-[#01215C] scale-100 hover:bg-white hover:text-[#01215C] active:scale-95"
            >
              Đồng ý
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
