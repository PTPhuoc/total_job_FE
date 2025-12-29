"use client";

import { formatDate } from "@/app/function/handleDaytime";
import { setWeb } from "@/app/store/slices/webSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ActionPage({ listNotify }) {
  const dispatch = useDispatch();
  const route = useRouter();

  const handleNavigate = (type) => {
    if (type === "EmployerApply") {
      dispatch(setWeb({ load: true }));
      route.push("/account/candidate/apply");
    }
    if (type === "CandidateApply"){
       dispatch(setWeb({ load: true }));
      route.push("/account/employer/apply");
    }
  };

  const seenNotify = async (id, type) => {
    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/notify/seen/`,
        { id: id },
        { withCredentials: true }
      )
      .then(async (rs) => {
        if (rs.data.status === "Success") {
          handleNavigate(type)
        }
      }).catch(err => console.log(err))
  };

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  return (
    <div className="mt-[100px] py-5 h-[820px] flex justify-center items-center">
      <div className="w-4/5 h-full p-5 gap-5 flex flex-col bg-zinc-100 rounded-2xl">
        {listNotify && listNotify.length > 0 ? (
          listNotify.map((item) => (
            <div
              onClick={() => {
                seenNotify(item.id, item.type);
              }}
              key={item.id}
              className="relative flex flex-col gap-5 p-5 bg-white rounded-lg border-2 border-white cursor-pointer duration-200 ease-in hover:border-[#01215c]"
            >
              {!item.status && <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-red-500"></div>}
              <div className="flex items-center gap-5">
                <p className="font-bold">{item.title}</p>
                <p>{formatDate(item.dateCreate)}</p>
              </div>
              <hr />
              <p>{item.message}</p>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
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
              Hiện vẩn chưa có thông báo nào cho bạn
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
