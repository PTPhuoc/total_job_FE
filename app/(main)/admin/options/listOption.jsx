"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogReport from "./LogReport";

export default function ListOption({ stateCrawl }) {
  const web = useSelector((state) => state.web);
  const dispatch = useDispatch();
  const [crawl, setCrawl] = useState({taskId: stateCrawl});

  const getCrawTopCV = (token) => {
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_PORT + "api/crawl/topcv/", {
        params: { codeJwt: token }, withCredentials: true
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setCrawl({...crawl, taskId: rs.data.taskId})
        } else {
          dispatch(
            setWindowWarning({
              for: "ErrorCraw",
              title: "Lỗi",
              content: rs.data.message ? rs.data.message : rs.data.error,
              type: "N",
              handle: "pending",
              isOpen: true,
              value: "",
            })
          );
          dispatch(setWeb({stateCrawl: false}))
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (crawl.taskId) {
      dispatch(setWeb({ stateCrawl: true }));
    }else{
      dispatch(setWeb({ stateCrawl: false }));
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="w-full h-[100px] flex gap-3 items-center p-5 bg-white">
        <p>Danh sách dữ liệu </p>
        <p className="text-orange-500">
          *Khi những tiến trình dưới đây hoạt động đều không thể hủy giửa chừng
        </p>
      </div>
      <div className="relative flex flex-1 w-full flex-col gap-1">
        <div className="w-full flex items-center gap-5 p-3 bg-white">
          <p className="w-1/6">Lấy dữ liệu topCV</p>
          <button
            disabled={web.stateCrawl}
            onClick={() => {
              const token = window.localStorage.getItem("Token");
              dispatch(setWeb({ stateCrawl: true }));
              getCrawTopCV(token);
            }}
            className={
              web.stateCrawl
                ? "p-3 bg-white text-[#01215C] border-2 border-[#01215C] scale-100 rounded-2xl duration-200 ease-in"
                : "p-3 bg-[#01215C] text-white border-2 border-[#01215C] scale-100 rounded-2xl duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
            }
          >
            {web.stateCrawl
              ? "Đang tiến thành cào..."
              : "Tiến thành cào dữ liệu"}
          </button>
        </div>
        <div className="w-full flex items-center gap-5 p-3 bg-white">
          <p className="w-1/6">Lấy dữ liệu carryViet</p>
          <button
            disabled={web.stateCrawl}
            onClick={() => {
              const token = window.localStorage.getItem("Token");
              dispatch(setWeb({ stateCrawl: true }));
              getCrawCarryViet(token);
            }}
            className={
              web.stateCrawl
                ? "p-3 bg-white text-[#01215C] border-2 border-[#01215C] scale-100 rounded-2xl duration-200 ease-in"
                : "p-3 bg-[#01215C] text-white border-2 border-[#01215C] scale-100 rounded-2xl duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
            }
          >
            {web.stateCrawl
              ? "Đang tiến thành cào..."
              : "Tiến thành cào dữ liệu"}
          </button>
        </div>
        {(web.stateCrawl && crawl.taskId) && <LogReport taskId={crawl.taskId} />}
      </div>
    </div>
  );
}
