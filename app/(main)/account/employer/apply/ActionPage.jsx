"use client";

import { formatDate } from "@/app/function/handleDaytime";
import { setWeb } from "@/app/store/slices/webSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { listStatusApply } from "../../getData";

export default function ActionPage({ applies }) {
  const dispatch = useDispatch();
  const [listApplies, setListApplies] = useState(applies);

  const getStatusApply = (key) => {
      const status = listStatusApply.find(item => item.key === key)
      return status.name
    }

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);
  return (
    <>
      {listApplies && listApplies.length > 0 ? (
        <div className="relative flex-1 flex flex-col min-w-0 gap-5 p-5 bg-zinc-100 rounded-2xl shadow-basic overflow-auto no-scroll">
          {listApplies.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 p-5 min-w-0 items-center bg-white rounded-lg shadow-basic"
            >
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex-1 flex items-start">
                  <div className="flex-1 flex gap-2 items-center">
                    <div className="flex flex-col gap-2 items-stretch">
                      <p className="px-5 shrink-0 bg-zinc-400 text-white rounded-lg">
                        Ngày nộp:
                      </p>
                      <p className="px-5 shrink-0 bg-zinc-400 text-white rounded-lg">
                        Email:
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p>{formatDate(item.dateCreate)}</p>
                      <p>{item.account.email}</p>
                    </div>
                  </div>
                  <div className="flex-1 flex gap-2 items-center">
                    <div className="flex flex-col gap-2 items-stretch">
                      <p className="px-5 shrink-0 bg-zinc-400 text-white rounded-lg">
                        Tuyển dụng:
                      </p>
                      <p className="px-5 shrink-0 bg-zinc-400 text-white rounded-lg">
                        Trạng thái:
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        className="truncate font-bold duration-200 ease-in hover:text-[#009DFF]"
                        href={`/job_detail?id=${item.job.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(setWeb({ load: true }));
                        }}
                      >
                        {item.job.name}
                      </Link>
                      <p>{getStatusApply(item.status)}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-1 bg-[#01215C]"></div>
                <div className="flex items-center gap-3 min-w-0">
                  <p className="px-5 shrink-0 bg-zinc-400 text-white rounded-lg">
                    Nội dung:
                  </p>
                  <p className="truncate" title={item.decryption}>
                    {item.decryption}
                  </p>
                </div>
              </div>
              <div className="flex justify-stretch flex-col gap-2">
                <Link
                  className="px-5 py-1 bg-[#01215C] text-white border-2 border-[#01215C] rounded-lg duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                  onClick={() => {dispatch(setWeb({load: true}))}}
                  href={`/account/employer/preview_candidate?id=${item.id}`}
                >
                  Xem hồ sơ
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center bg-zinc-100 rounded-2xl shadow-basic">
          <div className="w-[100px] h-[100px]">
            <svg
              className="w-full h-full fill-zinc-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
            </svg>
          </div>
          <p className="font-bold text-zinc-500">
            Không có tuyển dụng nào đã ứng tuyển
          </p>
        </div>
      )}
    </>
  );
}
