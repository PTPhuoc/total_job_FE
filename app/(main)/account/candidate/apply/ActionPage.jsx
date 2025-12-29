"use client";

import ButtonDefault from "@/app/component/ButtonDefault";
import { formatDate } from "@/app/function/handleDaytime";
import { setWeb } from "@/app/store/slices/webSlice";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "@/app/store/slices/windowSlice";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStatusApply } from "../../getData";

export default function ActionPage({ applies }) {
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();
  const [listApplies, setListApplies] = useState(applies);
  const [applyValue, setApplyValue] = useState({
    id: "",
    decryption: "",
  });
  const [isOpen, setIsOpen] = useState({
    changeDesc: false,
  });

  const getApplies = async () => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_apply_job/`, {
        withCredentials: true,
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setListApplies(rs.data.applies);
          setApplyValue({ id: "", decryption: "" });
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

  const changeDecryption = async () => {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/apply_job/`,
        { applyValue: { ...applyValue }, id: "Update Decryption" },
        { withCredentials: true }
      )
      .then(async (rs) => {
        if (rs.data.status === "Success") {
          setIsOpen({ ...isOpen, changeDesc: false });
          await getApplies();
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

  const deleteApplyJob = async () => {
    return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/delete_apply_job/`,
        { params: { id: applyValue.id }, withCredentials: true }
      )
      .then(async (rs) => {
        if (rs.data.status === "Success") {
          setApplyValue({ id: "", decryption: "" });
          await getApplies();
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

  const getStatusApply = (key) => {
    const status = listStatusApply.find(item => item.key === key)
    return status.name
  }

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  useEffect(() => {
    const handleWindow = async () => {
      if (windowWarning.handle === "accept") {
        if (windowWarning.for === "DeleteApplyJob") {
          await deleteApplyJob();
        }
        dispatch(setDefaultWindowWarning());
      }
    };
    handleWindow();
  }, [windowWarning]);

  return (
    <>
      {listApplies && listApplies.length > 0 ? (
        <div className="relative flex-1 flex flex-col min-w-0 gap-5 p-5 bg-zinc-100 rounded-2xl shadow-basic overflow-auto no-scroll">
          {isOpen.changeDesc && (
            <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-[rgba(255,255,255,0.5)] z-1">
              <div className="w-1/2 h-4/5 p-5 flex flex-col gap-3 bg-zinc-100 rounded-2xl shadow-basic">
                <textarea
                  name="decrytion"
                  className="flex-1 bg-white rounded-lg border-2 border-[#01215C] p-5"
                  placeholder="Mô tả đơn tuyển dụng"
                  value={applyValue.decryption}
                  onChange={(e) =>
                    setApplyValue({ ...applyValue, decryption: e.target.value })
                  }
                ></textarea>
                <div className="flex items-center gap-5">
                  <button
                    className="flex-1 py-1 bg-red-500 border-2 border-red-500 text-white rounded-lg duration-200 ease-in hover:bg-white hover:text-red-500"
                    onClick={() => {
                      setIsOpen({ ...isOpen, changeDesc: false });
                    }}
                  >
                    Hủy thay đổi
                  </button>
                  <ButtonDefault
                    classNameButton="flex-1 py-1 bg-[#01215C] border-2 border-[#01215C] text-white rounded-lg duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                    classNameWait="flex-1 py-1 bg-white border-2 border-[#01215C] rounded-lg"
                    textButton={"Thay đổi nội dung"}
                    handleApi={() => {
                      return changeDecryption();
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {listApplies.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 p-5 min-w-0 items-center bg-white border-2 border-white rounded-lg shadow-basic cursor-pointer duration-200 ease-in hover:border-[#01215c]"
            >
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-center gap-5">
                  <div className="flex self-start items-center px-5 gap-3 bg-zinc-400 text-white rounded-lg">
                  <p>Ngày nộp:</p>
                  <p>{formatDate(item.dateCreate)}</p>
                </div>
                <div className="flex self-start items-center px-5 gap-3 bg-zinc-400 text-white rounded-lg">
                  <p>Trạng thái:</p>
                  <p>{getStatusApply(item.status)}</p>
                </div>
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <p className="px-5 shrink-0 bg-zinc-400 text-white rounded-lg">
                    Tuyển dụng:
                  </p>
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
                </div>
                <hr className="h-1 bg-[#01215c] rounded-2xl"></hr>
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
                <button
                  disabled={!(item.status === "pending")}
                  className={
                    item.status === "pending"
                      ? "px-5 py-1 bg-[#01215C] text-white border-2 border-[#01215C] rounded-lg duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                      : "px-5 py-1 bg-zinc-400 text-white border-2 border-zinc-400 rounded-lg duration-200 ease-in"
                  }
                  onClick={() => {
                    setApplyValue({ id: item.id, decryption: item.decryption });
                    setIsOpen({ ...isOpen, changeDesc: true });
                  }}
                >
                  Sửa nội dung
                </button>
                <button
                  disabled={!(item.status === "pending")}
                  className={
                    item.status === "pending"
                      ? "px-5 py-1 bg-red-500 text-white border-2 border-red-500 rounded-lg duration-200 ease-in hover:bg-white hover:text-red-500"
                      : "px-5 py-1 bg-zinc-400 text-white border-2 border-zinc-400 rounded-lg duration-200 ease-in"
                  }
                  onClick={() => {
                    setApplyValue({ id: item.id, decryption: item.decryption });
                    dispatch(
                      setWindowWarning({
                        for: "DeleteApplyJob",
                        title: "Hủy ứng tuyển",
                        content:
                          "Bạn có chắc hủy ứng tuyển cho tuyển dụng này!",
                        handle: "pending",
                        type: "YorN",
                        isOpen: true,
                      })
                    );
                  }}
                >
                  Hủy ứng tuyển
                </button>
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
