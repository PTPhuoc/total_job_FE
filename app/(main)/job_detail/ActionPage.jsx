"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setWeb } from "@/app/store/slices/webSlice";
import Image from "next/image";
import { checkValue } from "./getData";
import { formatDate } from "@/app/function/handleDaytime";
import ButtonDefault from "@/app/component/ButtonDefault";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "@/app/store/slices/windowSlice";
import Link from "next/link";

export default function ActionPage({
  jobInfo,
  jobDesc,
  jobScore,
  saveJobValue,
  checkApply,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const windowWarning = useSelector((state) => state.windowWarning);
  const [job, setJob] = useState(jobInfo);
  const [desc, setDesc] = useState(jobDesc);
  const [applyValue, setApplyValue] = useState({
    id: checkApply,
    decryption: "",
  });
  const [isOpen, setIsOpen] = useState({
    applyJob: false,
  });
  const [fields, setFields] = useState(() => {
    return jobInfo.requires.filter(
      (item) => item.title.toLowerCase() === "nghề"
    );
  });
  const [scoreInfo, setScoreInfo] = useState(() => {
    const getValue = checkValue.find((item) => jobScore >= item.score);
    return {
      score: jobScore,
      color: getValue.color,
      text: getValue.text,
    };
  });
  const [require, setRequire] = useState(() => {
    if (jobInfo.requires && jobInfo.requires.length > 0) {
      const getRequire = job.requires.filter(
        (item) => !["nghề", "lương"].includes(item.title.toLowerCase())
      );
      return getRequire;
    }
    return [];
  });

  const [save, setSave] = useState({
    job: saveJobValue ? saveJobValue.job : "",
    company: saveJobValue ? saveJobValue.company : "",
  });

  const route = useRouter();

  const getField = (fields, nameField) => {
    const fieldValue = fields.find((item) =>
      nameField.includes(item.title.toLowerCase())
    );
    return fieldValue ? fieldValue.requestText : null;
  };

  const saveJob = async () => {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_job/`,
        { id: job.id },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setSave({ ...save, job: rs.data.saveJobId });
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

  const deleteSaveJob = async () => {
    return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/delete_save_job/`,
        { params: { id: job.id }, withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setSave({ ...save, job: rs.data.saveJobId });
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

  const saveCompany = async () => {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_company/`,
        { id: job.companyId },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setSave({ ...save, company: rs.data.saveCompanyId });
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

  const deleteSaveCompany = async () => {
    return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/delete_save_company/`,
        { params: { id: job.companyId }, withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setSave({ ...save, company: rs.data.saveCompanyId });
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

  const applyJob = async () => {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/apply_job/`,
        { applyValue: { ...applyValue }, id: job.id },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setApplyValue({ ...applyValue, id: rs.data.newApply.id });
          setIsOpen({ ...isOpen, applyJob: false });
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
      .then((rs) => {
        if (rs.data.status === "Success") {
          setApplyValue({ id: "", decryption: "" });
          setIsOpen({ ...isOpen, applyJob: false });
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
    <div className="pt-[100px] flex flex-col w-full items-center">
      <div className="relative w-4/5 max-h-[800px] flex gap-5 py-5">
        {isOpen.applyJob && (
          <div className="absolute top-0 flex justify-center items-center w-full h-full  z-1">
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
                    setIsOpen({ ...isOpen, applyJob: false });
                  }}
                >
                  Hủy nộp đơn
                </button>
                <ButtonDefault
                  classNameButton="flex-1 py-1 bg-[#01215C] border-2 border-[#01215C] text-white rounded-lg duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                  classNameWait="flex-1 py-1"
                  textButton={"Nộp đơn ứng tuyển"}
                  handleApi={() => {
                    return applyJob();
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex-2 flex flex-col gap-5">
          <div className="flex flex-col gap-3 bg-white rounded-2xl p-5 shadow-basic">
            <div className="flex flex-1 gap-3 items-center">
              <div className="relative w-[150px] h-[150px] border-2 border-zinc-200 bg-zinc-200 rounded-2xl overflow-hidden">
                {job.company.image === "noImage" ? (
                  <svg
                    className="w-full h-full fill-zinc-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M288 48c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 48 48 0 0-72c0-13.3 10.7-24 24-24s24 10.7 24 24l0 72 16 0c26.5 0 48 21.5 48 48l0 320c0 26.5-21.5 48-48 48l-256 0c-26.5 0-48-21.5-48-48l0-416zm64 64l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM352 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM528 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM512 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM96 480l0-160-16 0c-44.2 0-80-35.8-80-80 0-26.7 13.1-50.3 33.2-64.9-.8-4.9-1.2-10-1.2-15.1 0-53 43-96 96-96s96 43 96 96l0 96c0 35.3-28.7 64-64 64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32z" />
                  </svg>
                ) : (
                  <Image
                    fill
                    alt={job.company.image}
                    src={`${process.env.NEXT_PUBLIC_SERVER_PORT}media/${job.company.image}`}
                    className="object-contain"
                  />
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <p className="line-clamp-2 font-bold" title={job.name}>
                  {job.sourceLink ? (
                    <Link
                      href={job.sourceLink}
                      target="_blank"
                      className="self-start font-normal bg-[#009DFF] border-2 border-[#009DFF] rounded-md text-white px-2 mr-2 duration-200 ease-in hover:bg-white hover:text-[#009DFF]"
                    >
                      {job.sourceName}
                    </Link>
                  ) : (
                    <span className="self-start font-normal bg-[#009DFF] border-2 border-[#009DFF] rounded-md text-white px-2 mr-2 duration-200 ease-in hover:bg-white hover:text-[#009DFF]">
                      {job.sourceName}
                    </span>
                  )}

                  {job.name}
                </p>
                <div className="flex items-stretch gap-3">
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <p>Thu nhập:</p>
                      <p className="font-bold">
                        {getField(job.requires, "lương")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p>Địa điểm làm việc:</p>
                      <p className="font-bold">
                        {job.address !== "noText" ? job.address : "Không có"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#01215C] w-1 rounded-2xl"></div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <p>Ngành nghề:</p>
                      {fields && fields.length > 0 ? (
                        <div className="flex flex-1 gap-2 items-center overflow-auto no-scroll">
                          {fields.map((field, index) => (
                            <button
                              key={index}
                              className="shrink-0 px-2 border-2 border-[#009DFF] rounded-lg duration-200 ease-in hover:text-[#009DFF]"
                            >
                              {field.requestText}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p>Không có</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <p>Hạn nộp:</p>
                      <p className="font-bold">{formatDate(job.dateLimit)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-stretch justify-between">
              <div
                className="flex items-center justify-center gap-1  py-1 w-[150px] rounded-lg text-white"
                style={{
                  backgroundColor: scoreInfo.color,
                }}
              >
                <p>{scoreInfo.text}:</p>
                <p>{scoreInfo.score.toFixed(2)}%</p>
              </div>
              {user.email && user.role === "Candidate" && (
                <div className="flex items-center gap-2">
                  <ButtonDefault
                    classNameButton="px-5 py-1 bg-[#01215C] border-2 border-[#01215C] rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                    textButton={save.job ? "Hủy lưu" : "Lưu tuyển dụng"}
                    handleApi={() => {
                      return save.job ? deleteSaveJob() : saveJob();
                    }}
                  />
                  {job.sourceName === "FUJobs" && (
                    <button
                      className="px-5 py-1 bg-[#01215C] border-2 border-[#01215C] rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                      onClick={() => {
                        if (applyValue.id) {
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
                        } else {
                          setIsOpen({ ...isOpen, applyJob: true });
                        }
                      }}
                    >
                      {applyValue.id ? "Hủy ứng tuyển" : "Ứng tuyển"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 bg-white flex flex-col gap-3 p-5 rounded-2xl shadow-basic overflow-auto no-scroll">
            {desc && desc.length > 0 ? (
              desc.map((item, index) => (
                <div key={index} className="w-full flex flex-col">
                  <p className="font-bold">{item.title}</p>
                  <p className="text-justify whitespace-pre-wrap">
                    {item.decryption}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col flex-1 justify-center items-center">
                <div className="w-[100px] h-[100px]">
                  <svg
                    className="fill-zinc-500 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M176 48L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-240-88 0c-39.8 0-72-32.2-72-72l0-88zM316.1 160L224 67.9 224 136c0 13.3 10.7 24 24 24l68.1 0zM0 64C0 28.7 28.7 0 64 0L197.5 0c17 0 33.3 6.7 45.3 18.7L365.3 141.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" />
                  </svg>
                </div>
                <p className="font-bold text-zinc-500">
                  Tuyển dụng không có nội dung
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white shadow-basic">
            <div className="flex w-full gap-3 items-center">
              <div className="relative w-[150px] h-[150px] border-2 border-zinc-200 bg-zinc-200 rounded-2xl overflow-hidden">
                {job.company.image === "noImage" ? (
                  <svg
                    className="w-full h-full fill-zinc-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M288 48c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 48 48 0 0-72c0-13.3 10.7-24 24-24s24 10.7 24 24l0 72 16 0c26.5 0 48 21.5 48 48l0 320c0 26.5-21.5 48-48 48l-256 0c-26.5 0-48-21.5-48-48l0-416zm64 64l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM352 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM528 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM512 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM96 480l0-160-16 0c-44.2 0-80-35.8-80-80 0-26.7 13.1-50.3 33.2-64.9-.8-4.9-1.2-10-1.2-15.1 0-53 43-96 96-96s96 43 96 96l0 96c0 35.3-28.7 64-64 64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32z" />
                  </svg>
                ) : (
                  <Image
                    fill
                    alt={job.company.image}
                    src={`${process.env.NEXT_PUBLIC_SERVER_PORT}media/${job.company.image}`}
                    sizes="(max-width: 768px), (max-width: 1200px)"
                    className="object-contain"
                  />
                )}
              </div>
              <p className="flex-1 text-wrap font-bold">{job.company.name}</p>
            </div>
            <div className="flex flex-1 gap-2">
              <p>Quy mô:</p>
              <p className="font-bold">
                {job.company.scale !== "noText"
                  ? job.company.scale
                  : "Không có"}
              </p>
            </div>
            <div className="flex flex-1 gap-2">
              <p>Lĩnh vực:</p>
              <p className="font-bold">
                {job.company.field !== "noText"
                  ? job.company.field
                  : "Không có"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  dispatch(setWeb({ load: true }));
                  route.push(`/company_detail?id=${job.company.id}`);
                }}
                className="flex-1 py-1 bg-[#01215C] text-white border-2 border-[#01215C] rounded-lg scale-100 duration-300 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
              >
                Chi tiết công ty
              </button>
              {user.email && user.role === "Candidate" && (
                <ButtonDefault
                  classNameButton="flex-1 py-1 bg-[#009DFF] text-white border-2 border-[#009DFF] rounded-lg scale-100 duration-300 ease-in hover:bg-white hover:text-[#009DFF] active:scale-95"
                  classNameWait="flex-1 py-1 border-2 border-[#009DFF] rounded-lg"
                  textButton={save.company ? "Hủy theo dõi" : "Theo dõi"}
                  handleApi={() => {
                    return save.company ? deleteSaveCompany() : saveCompany();
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white shadow-basic">
            {require && require.length > 0 ? (
              require.map((item, index) => (
                <div key={index} className="flex w-full gap-3 items-center">
                  <p className="px-5 text-white border-2 border-zinc-400 bg-zinc-400 rounded-lg">
                    {item.title}
                  </p>
                  <p className="flex-1 border-b-2 border-[#01215C]">
                    {item.requestText}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex w-full h-[300px] justify-center items-center">
                <p className="text-zinc-400 font-bold">Không có yêu cầu</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
