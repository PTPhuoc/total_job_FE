"use client";

import ButtonDefault from "@/app/component/ButtonDefault";
import InputDate from "@/app/component/InputDate";
import InputListAsTag from "@/app/component/InputListAsTag";
import InputListSearch from "@/app/component/InputListSearch";
import { listCity } from "@/app/data";
import { setWeb } from "@/app/store/slices/webSlice";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "@/app/store/slices/windowSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ActionPage({
  accountValue,
  careers,
  levels,
  experiences,
  salarys,
  formOfWorks,
  educations,
  recruitments,
  jobInfo,
}) {
  const dispatch = useDispatch();
  const [account, setAccount] = useState(accountValue);
  const windowWarning = useSelector((state) => state.windowWarning);
  const [job, setJob] = useState(jobInfo);
  const [inputValue, setInputValue] = useState(() => {
    if (job.id) {
      return {
        id: job.id,
        name: job.name ? job.name : "",
        address: job.address ? job.address : "",
        dateLimit: job.dateLimit ? job.dateLimit : "",
        requires:
          job.requires && job.requires.length > 0 ? [...job.requires] : [],
      };
    } else {
      return {
        id: "",
        name: "",
        address: "",
        dateLimit: "",
        requires: [
          { title: "Kinh nghiệm", requestText: "" },
          { title: "Học vấn", requestText: "" },
          { title: "Cấp bật", requestText: "" },
          { title: "Số lượng", requestText: "" },
          { title: "Hình thức làm việc", requestText: "" },
          { title: "Lương", requestText: "" },
        ],
      };
    }
  });
  const expIndex = inputValue.requires.findIndex(
    (item) => item.title === "Kinh nghiệm"
  );
  const educationIndex = inputValue.requires.findIndex(
    (item) => item.title === "Học vấn"
  );
  const levelIndex = inputValue.requires.findIndex(
    (item) => item.title === "Cấp bật"
  );
  const recruitmentIndex = inputValue.requires.findIndex(
    (item) => item.title === "Số lượng"
  );
  const formOfWorkIndex = inputValue.requires.findIndex(
    (item) => item.title === "Hình thức làm việc"
  );
  const salaryIndex = inputValue.requires.findIndex(
    (item) => item.title === "Lương"
  );
  const listCareer = inputValue.requires.filter(
    (item) => item.title === "Nghề"
  );
  const matchCareer =
    listCareer.length > 0
      ? listCareer.map((item) => {
          return item.requestText;
        })
      : [];

  const [listDecs, setListDesc] = useState(
    job.details && job.details.length > 0 ? [...job.details] : []
  );
  const sortDesc =
    listDecs.length > 0 ? listDecs.sort((a, b) => a.order - b.order) : [];
  const [isChange, setIsChange] = useState(false);
  const route = useRouter();

  const checkInput = () => {
    if (job.id) {
      for (const [key, value] of Object.entries(inputValue)) {
        if (key === "requires") continue;
        const matchValue = typeof value === "string" ? value.trim() : value;
        if (matchValue !== job[key]) return true;
      }
      return false;
    }
    for (const [key, value] of Object.entries(inputValue)) {
      if (["id", "requires"].includes(key)) continue;
      if (!value.trim()) return false;
    }
    return true;
  };

  const checkRequires = () => {
    if (job.id) {
      if (inputValue.requires.length !== job.requires.length) return true;
      const allRequestText = job.requires.map((item) => {
        return item.requestText;
      });
      for (let i = 0; i < inputValue.requires.length; i++) {
        if (!allRequestText.includes(inputValue.requires[i].requestText.trim()))
          return true;
      }
      return false;
    }
    for (const r of inputValue.requires) {
      if (!r.requestText.trim()) return false;
    }
    return true;
  };

  const checkDesc = () => {
    if (job.id) {
      if (listDecs.length !== job.details.length) return true;
      for (let i = 0; i < listDecs.length; i++) {
        const a = listDecs[i];
        const b = job.details[i];
        if (
          a.title.trim() !== b.title ||
          a.decryption.trim() !== b.decryption
        ) {
          return true;
        }
      }
      return false;
    }

    for (const d of listDecs) {
      if (!d.title.trim() || !d.decryption.trim()) return false;
    }

    return true;
  };

  const checkChange = () => {
    if (job.id) return checkInput() || checkRequires() || checkDesc();
    return checkInput() && checkRequires() && checkDesc();
  };

  const saveOrChange = async () => {
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/edit_job/`,
        { valueChange: { ...inputValue, desc: [...listDecs] } },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          dispatch(setWeb({ load: true }));
          route.push("/account/employer/job");
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

  const deleteJob = async () => {
    return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/delete_employer_job/`,
        { params: { id: job.id }, withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          dispatch(setWeb({ load: true }));
          route.push("/account/employer/job");
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
    setIsChange(checkChange());
  }, [inputValue, listDecs]);

  useEffect(() => {
    if (windowWarning.handle === "accept") {
      if (windowWarning.for === "DeleteEmployerJob") {
        deleteJob();
      }
      dispatch(setDefaultWindowWarning());
    }
  }, [windowWarning]);

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex flex-1 flex-col gap-5 p-5 bg-white rounded-2xl shadow-basic overflow-auto no-scroll">
        <div className="flex flex-col">
          <p className="font-bold">Thông tin chính</p>
          <hr className="h-1 bg-[#01215C] rounded-2xl" />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Tên tuyển dụng</p>
          <input
            type="text"
            name="name"
            className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
            placeholder="Nhập tên tuyển dụng"
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Thu nhập/Lương (triệu)</p>
          <input
            type="text"
            name="name"
            className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            value={
              salaryIndex !== -1
                ? inputValue.requires[salaryIndex].requestText
                : ""
            }
            onChange={(e) =>
              setInputValue((prev) => {
                return {
                  ...prev,
                  requires: prev.requires.map((item) =>
                    item.title === "Lương"
                      ? { ...item, requestText: e.target.value }
                      : item
                  ),
                };
              })
            }
            placeholder="Nhập thu nhập/lương"
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-9">
          <p className="px-5">Hạn nộp</p>
          <InputDate
            handleChange={(value) =>
              setInputValue({ ...inputValue, dateLimit: value })
            }
            isGiven={true}
            inputValue={inputValue.dateLimit}
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-8">
          <p className="px-5">Ngành nghề</p>
          <InputListAsTag
            listSearch={careers}
            handleChange={(value) => {
              if (value && value.length > 0) {
                const newCareer = value.map((item) => {
                  return {
                    id: "",
                    jobId: "",
                    title: "Nghề",
                    requestText: item,
                  };
                });
                const removeCareer = inputValue.requires.filter(
                  (item) => item.title !== "Nghề"
                );
                setInputValue((prev) => {
                  return { ...prev, requires: [...removeCareer, ...newCareer] };
                });
              } else {
                setInputValue((prev) => {
                  return {
                    ...prev,
                    requires: prev.requires.filter(
                      (item) => item.title !== "Nghề"
                    ),
                  };
                });
              }
            }}
            placeholder="Nhập ngành nghề"
            availableList={matchCareer}
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-7">
          <p className="px-5">Địa điểm làm việc</p>
          <InputListSearch
            inputValue={inputValue.address}
            inputChange={(value) =>
              setInputValue({ ...inputValue, address: value })
            }
            placeHolder="Nhập địa điểm"
            className="border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            listSearch={listCity}
            showlist={(item, index) => {
              return (
                <button
                  key={index}
                  className="bg-white text-start px-5 py-1 duration-200 ease-in hover:bg-zinc-200"
                  onClick={() =>
                    setInputValue({ ...inputValue, address: item.name })
                  }
                >
                  {item.name}
                </button>
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Yêu cầu của tuyển dụng</p>
          <hr className="h-1 bg-[#01215C] rounded-2xl" />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-6">
          <p className="px-5">Kinh nghiệm</p>
          <InputListSearch
            inputValue={
              expIndex !== -1 ? inputValue.requires[expIndex].requestText : ""
            }
            inputChange={(value) =>
              setInputValue((prev) => {
                return {
                  ...prev,
                  requires: prev.requires.map((item) =>
                    item.title === "Kinh nghiệm"
                      ? { ...item, requestText: value }
                      : item
                  ),
                };
              })
            }
            placeHolder="Nhập kinh nghiệm"
            className="border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            listSearch={experiences}
            showlist={(item, index) => {
              return (
                <button
                  key={index}
                  className="bg-white text-start px-5 py-1 duration-200 ease-in hover:bg-zinc-200"
                  onClick={() =>
                    setInputValue((prev) => {
                      return {
                        ...prev,
                        requires: prev.requires.map((i) =>
                          i.title === "Kinh nghiệm"
                            ? { ...i, requestText: item.name }
                            : i
                        ),
                      };
                    })
                  }
                >
                  {item.name}
                </button>
              );
            }}
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-5">
          <p className="px-5">Hình thức làm việc</p>
          <InputListSearch
            inputValue={
              formOfWorkIndex !== -1
                ? inputValue.requires[formOfWorkIndex].requestText
                : ""
            }
            inputChange={(value) =>
              setInputValue((prev) => {
                return {
                  ...prev,
                  requires: prev.requires.map((item) =>
                    item.title === "Hình thức làm việc"
                      ? { ...item, requestText: value }
                      : item
                  ),
                };
              })
            }
            placeHolder="Nhập hình thức làm việc"
            className="border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            listSearch={formOfWorks}
            showlist={(item, index) => {
              return (
                <button
                  key={index}
                  className="bg-white text-start px-5 py-1 duration-200 ease-in hover:bg-zinc-200"
                  onClick={() =>
                    setInputValue((prev) => {
                      return {
                        ...prev,
                        requires: prev.requires.map((i) =>
                          i.title === "Hình thức làm việc"
                            ? { ...i, requestText: item.name }
                            : i
                        ),
                      };
                    })
                  }
                >
                  {item.name}
                </button>
              );
            }}
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-4">
          <p className="px-5">Cấp bật</p>
          <InputListSearch
            inputValue={
              levelIndex !== -1
                ? inputValue.requires[levelIndex].requestText
                : ""
            }
            inputChange={(value) =>
              setInputValue((prev) => {
                return {
                  ...prev,
                  requires: prev.requires.map((item) =>
                    item.title === "Cấp bật"
                      ? { ...item, requestText: value }
                      : item
                  ),
                };
              })
            }
            placeHolder="Nhập cấp bật"
            className="border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            listSearch={levels}
            showlist={(item, index) => {
              return (
                <button
                  key={index}
                  className="bg-white text-start px-5 py-1 duration-200 ease-in hover:bg-zinc-200"
                  onClick={() =>
                    setInputValue((prev) => {
                      return {
                        ...prev,
                        requires: prev.requires.map((i) =>
                          i.title === "Cấp bật"
                            ? { ...i, requestText: item.name }
                            : i
                        ),
                      };
                    })
                  }
                >
                  {item.name}
                </button>
              );
            }}
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-3">
          <p className="px-5">Học vấn</p>
          <InputListSearch
            inputValue={
              educationIndex !== -1
                ? inputValue.requires[educationIndex].requestText
                : ""
            }
            inputChange={(value) =>
              setInputValue((prev) => {
                return {
                  ...prev,
                  requires: prev.requires.map((item) =>
                    item.title === "Học vấn"
                      ? { ...item, requestText: value }
                      : item
                  ),
                };
              })
            }
            placeHolder="Nhập học vấn"
            className="border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            listSearch={educations}
            showlist={(item, index) => {
              return (
                <button
                  key={index}
                  className="bg-white text-start px-5 py-1 duration-200 ease-in hover:bg-zinc-200"
                  onClick={() =>
                    setInputValue((prev) => {
                      return {
                        ...prev,
                        requires: prev.requires.map((i) =>
                          i.title === "Học vấn"
                            ? { ...i, requestText: item.name }
                            : i
                        ),
                      };
                    })
                  }
                >
                  {item.name}
                </button>
              );
            }}
          />
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl z-2">
          <p className="px-5">Số lượng tuyển</p>
          <InputListSearch
            inputValue={
              recruitmentIndex !== -1
                ? inputValue.requires[recruitmentIndex].requestText
                : ""
            }
            inputChange={(value) =>
              setInputValue((prev) => {
                return {
                  ...prev,
                  requires: prev.requires.map((item) =>
                    item.title === "Số lượng"
                      ? { ...item, requestText: value }
                      : item
                  ),
                };
              })
            }
            placeHolder="Nhập số lượng tuyển"
            className="border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            listSearch={recruitments}
            showlist={(item, index) => {
              return (
                <button
                  key={index}
                  className="bg-white text-start px-5 py-1 duration-200 ease-in hover:bg-zinc-200"
                  onClick={() =>
                    setInputValue((prev) => {
                      return {
                        ...prev,
                        requires: prev.requires.map((i) =>
                          i.title === "Số lượng"
                            ? { ...i, requestText: item.name }
                            : i
                        ),
                      };
                    })
                  }
                >
                  {item.name}
                </button>
              );
            }}
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Mô tả tuyển dụng</p>
          <hr className="h-1 bg-[#01215C] rounded-2xl" />
        </div>
        <div className="flex flex-col p-5 gap-5 border-2 border-zinc-200 rounded-xl z-1">
          {sortDesc &&
            sortDesc.length > 0 &&
            sortDesc.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="outline-none flex-1 px-5 py-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in focus:border-[#01215C]"
                      value={item.title}
                      placeholder="Tiêu đề"
                      onChange={(e) =>
                        setListDesc((prev) =>
                          prev.map((des, i) =>
                            i === index
                              ? { ...des, title: e.target.value }
                              : des
                          )
                        )
                      }
                    />
                    <button
                      className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                      onClick={() => {
                        setListDesc((prev) =>
                          prev.filter((desc, i) => i !== index)
                        );
                      }}
                    >
                      <svg
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                      >
                        <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" />
                      </svg>
                    </button>
                  </div>

                  <textarea
                    type="text"
                    className="outline-none min-h-[300px] max-h-[600px] px-5 py-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in focus:border-[#01215C]"
                    value={item.decryption}
                    placeholder="Mô tả"
                    onChange={(e) =>
                      setListDesc((prev) =>
                        prev.map((des, i) =>
                          i === index
                            ? { ...des, decryption: e.target.value }
                            : des
                        )
                      )
                    }
                  />
                </div>
                {index != listDecs.length - 1 && (
                  <hr className="h-1 bg-[#01215C] rounded-2xl" />
                )}
              </React.Fragment>
            ))}
          <button
            className="py-1 bg-[#01215C] border-2 border-[#01215C] rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-[#01215C]"
            onClick={() => {
              setListDesc([
                ...listDecs,
                {
                  id: "",
                  jobId: "",
                  title: "",
                  decryption: "",
                  order: listDecs.length + 1,
                },
              ]);
            }}
          >
            Thêm mô tả
          </button>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <ButtonDefault
          textButton={inputValue.id ? "Cập nhật tuyển dụng" : "Tạo tuyển dụng"}
          classNameWait="flex-1"
          classNameButton={
            isChange
              ? "flex-1 py-1 bg-[#01215C] border-2 border-[#01215C] rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-[#01215C]"
              : "flex-1 py-1 bg-zinc-500 border-2 border-zinc-500 rounded-lg text-white duration-200 ease-in"
          }
          disable={!isChange}
          handleApi={() => {
            return saveOrChange();
          }}
        />

        {inputValue.id && (
          <button
            className="flex-1 py-1 bg-orange-500 border-2 border-orange-500 rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-orange-500"
            onClick={() => {
              dispatch(setWeb({ load: true }));
              route.push("/account/employer/job");
            }}
          >
            Hủy cập nhật
          </button>
        )}
        {inputValue.id && (
          <button
            className="flex-1 py-1 bg-red-500 border-2 border-red-500 rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-red-500"
            onClick={() => {
              dispatch(
                setWindowWarning({
                  for: "DeleteEmployerJob",
                  title: "Xóa tuyển dụng",
                  content: "Bạn có chắc muốn xóa tuyển dụng này!",
                  handle: "pending",
                  type: "YorN",
                  isOpen: true,
                  value: "",
                })
              );
            }}
          >
            Xóa tuyển dụng
          </button>
        )}
      </div>
    </div>
  );
}
