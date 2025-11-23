"use client";

import ButtonDefault from "@/app/component/ButtonDefault";
import { formatDate } from "@/app/function/handleDaytime";
import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ActionPage({ allJob }) {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState(allJob);
  const route = useRouter();
  const [searchValue, setSearchValue] = useState({ name: "" });

  const getJob = async () => {
    return axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_all_employer_job/`,
        { params: { name: searchValue.name }, withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setJobs(rs.data.jobs);
        } else {
          dispatch(
            setWindowWarning({
              for: rs.data.status,
              title: rs.data.status,
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteJob = async (id) => {
    return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/delete_employer_job/`,
        { params: { id: id }, withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          getJob();
        } else {
          dispatch(
            setWindowWarning({
              for: rs.data.status,
              title: rs.data.status,
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-white rounded-2xl shadow-basic">
      <div className="flex gap-5 p-5 items-center shadow-basic">
        <div className="flex flex-1 gap-1 items-center">
          <input
            className="flex-1 outline-none px-5 py-1 border-2 border-[#01215C] rounded-lg"
            placeholder="Tên tuyển dụng"
            name="name"
            onChange={(e) =>
              setSearchValue({
                ...searchValue,
                name: e.target.value.trim() ?? e.target.value,
              })
            }
          />
          <button
            className="px-5 py-1 bg-[#01215C] border-2 border-[#01215C] rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-[#01215C] "
            onClick={() => getJob()}
          >
            Tìm kiếm
          </button>
        </div>
        <button
          className="px-5 py-1 bg-[#01215C] border-2 border-[#01215C] rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-[#01215C] "
          onClick={() => {
            dispatch(setWeb({ load: true }));
            route.push("/account/employer/edit_job");
          }}
        >
          Tạo tuyển dụng
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-5 p-5 overflow-auto no-scroll">
        {jobs && jobs.length > 0 ? (
          jobs.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border-2 border-white p-5 rounded-2xl shadow-basic min-w-0 duration-200 ease-in hover:border-[#01215C]"
              onClick={() => {
                dispatch(setWeb({ load: true }));
                route.push(`/account/employer/edit_job?id=${item.id}`);
              }}
            >
              <div className="flex flex-1 flex-col gap-3 min-w-0">
                <p className="font-bold truncate">
                  {item.sourceLink ? (
                    <Link
                      href={item.sourceLink}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="self-start font-normal bg-[#009DFF] border-2 border-[#009DFF] rounded-md text-white px-2 mr-2 duration-200 ease-in hover:bg-white hover:text-[#009DFF]"
                    >
                      {item.sourceName}
                    </Link>
                  ) : (
                    <span className="self-start font-normal bg-[#009DFF] border-2 border-[#009DFF] rounded-md text-white px-2 mr-2 duration-200 ease-in hover:bg-white hover:text-[#009DFF]">
                      {item.sourceName}
                    </span>
                  )}

                  {item.name}
                </p>
                <div className="flex items-center gap-5 self-start">
                  <div className="flex items-center px-5 gap-3 bg-zinc-400 text-white rounded-lg">
                    <p>Hạn nộp:</p>
                    <p>{formatDate(item.dateLimit)}</p>
                  </div>
                  <div className="flex items-center px-5 gap-3 bg-zinc-400 text-white rounded-lg">
                    <p>Địa điểm:</p>
                    <p>{item.address}</p>
                  </div>
                </div>
              </div>
              <ButtonDefault
                textButton={"Xóa tuyển dụng"}
                handleApi={() => {
                  return deleteJob(item.id);
                }}
              />
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col bg-white justify-center items-center">
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
              Không có tuyển dụng nào được tạo
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
