"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageAccount2 from "@/app/assets/Image_Account_2.png";
import { formatDate } from "@/app/function/handleDaytime";
import InputDate from "@/app/component/InputDate";
import InputAddress from "@/app/component/InputAddress";
import InputAsTag from "@/app/component/InputAsTag";
import axios from "axios";
import {
  setDefaultWindowWarning,
  setWindowWarning,
} from "@/app/store/slices/windowSlice";
import AddEducation from "./AddEducation";
import AddExperience from "./AddExperience";
import AddProject from "./AddProject";
import ButtonDefault from "@/app/component/ButtonDefault";

export default function ActionPage({
  accountInfo,
  listEdu,
  skillCatalog,
  listCareer,
  listFormOfWork,
}) {
  const [account, setAccount] = useState(accountInfo);
  const [skill, setSkill] = useState(skillCatalog);
  const [inputValue, setInputValue] = useState(() => {
    if (account && account.candidate) {
      return {
        name: account.candidate.name ?? "",
        birthday: account.candidate.birthday ?? "",
        decryption: account.candidate.decryption ?? "",
        address: account.candidate.address ?? "",
        skills: account.candidate.skills ?? "",
        image: account.candidate.image ?? "",
      };
    }
    return {
      name: "",
      birthday: "",
      decryption: "",
      address: "",
      skills: "",
      image: "",
    };
  });
  const [education, setEducation] = useState(
    account.education ? [...account.education] : []
  );
  const [exp, setExp] = useState(account.exp ? [...account.exp] : []);
  const [project, setProject] = useState(
    account.project ? [...account.project] : []
  );
  const [educationInput, setEducationInput] = useState({
    id: "",
    name: "",
    degree: "",
    industry: "",
    course: "",
    decryption: "",
  });
  const [expInput, setExpInput] = useState({
    id: "",
    field: "",
    formOfWork: "",
    company: "",
    executionTime: "",
    address: "",
    decryption: "",
  });
  const [projectInput, setProjectInput] = useState({
    id: "",
    name: "",
    executionTime: "",
    field: "",
    link: "",
    image: "",
    decryption: "",
  });
  const [imageValue, setImageValue] = useState({
    image: null,
    preview: null,
  });
  const [isOpen, setIsOpen] = useState({
    education: false,
    exp: false,
    project: false,
  });
  const dispatch = useDispatch();
  const windowWarning = useSelector((state) => state.windowWarning);
  const inputImage = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImageValue({ preview: previewUrl, image: file });
  };

  const checkChange = () => {
    let check = false;

    if (account.candidate) {
      Object.entries(inputValue).forEach(([key, value]) => {
        const matchValue1 = account.candidate[key]
          ? account.candidate[key]
          : "";
        const matchValue2 = value ? value : "";
        if (matchValue2.trim() !== matchValue1.trim()) {
          check = true;
        }
      });
    }
    return check;
  };

  const saveChange = async (otherValue) => {
    return axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_candidate/`,
        {
          valueChange: otherValue
            ? { ...otherValue }
            : { candidate: { ...inputValue } },
        },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setAccount({ ...rs.data.updatedAccount });
          setInputValue({ ...rs.data.updatedAccount.candidate });
          setEducation([...rs.data.updatedAccount.education] ?? []);
          setExp([...rs.data.updatedAccount.exp] ?? []);
          setProject([...rs.data.updatedAccount.project] ?? []);
        } else {
          dispatch(
            setWindowWarning({
              for: rs.data.status,
              title: rs.data.status,
              content: rs.data.message,
              handle: "pending",
              type: "N",
              isOpen: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>
        setIsOpen({ education: false, exp: false, project: false })
      );
  };

  const saveProject = async (value, image) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("valueChange", JSON.stringify({ ...value }));
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_project_candidate/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setAccount({ ...rs.data.updatedAccount });
          setInputValue({ ...rs.data.updatedAccount.candidate });
          setEducation([...rs.data.updatedAccount.education] ?? []);
          setExp([...rs.data.updatedAccount.exp] ?? []);
          setProject([...rs.data.updatedAccount.project] ?? []);
        } else {
          dispatch(
            setWindowWarning({
              for: rs.data.status,
              title: rs.data.status,
              content: rs.data.message,
              handle: "pending",
              type: "N",
              isOpen: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>
        setIsOpen({ education: false, exp: false, project: false })
      );
  };

  const saveImage = () => {
    const formData = new FormData();
    formData.append("image", imageValue.image);
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_image/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue({ ...inputValue, image: rs.data.image });
          setAccount({ ...account, image: rs.data.image });
          setImageValue({ image: null, preview: null });
          inputImage.current.value = "";
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
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteInfoCandidate = async (value) => {
    return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/delete_info_candidate/`,
        {
          params: { valueChange: JSON.stringify({ ...value }) },
          withCredentials: true,
        }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setAccount({ ...rs.data.updatedAccount });
          setInputValue({ ...rs.data.updatedAccount.candidate });
          setEducation([...rs.data.updatedAccount.education] ?? []);
          setExp([...rs.data.updatedAccount.exp] ?? []);
          setProject([...rs.data.updatedAccount.project] ?? []);
        } else {
          dispatch(
            setWindowWarning({
              for: rs.data.status,
              title: rs.data.status,
              content: rs.data.message,
              handle: "pending",
              type: "N",
              isOpen: true,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stringMonthYear = (value) => {
    const [start, end] = (value ?? "").split("-");
    const [startMonth, startYear] = (start ?? "").split(",");
    const [endMonth, endYear] = (end ?? "").split(",");
    return `${startMonth && startMonth + "/"}${startYear} - ${
      endMonth && endMonth + "/"
    }${endYear}`;
  };

  const isChange = checkChange()

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  useEffect(() => {
    const handleWindow = async () => {
      if (windowWarning.handle === "accept") {
        if (windowWarning.for === "DeleteEducation") {
          await deleteInfoCandidate({ educationId: windowWarning.value });
        } else if (windowWarning.for === "DeleteExperience") {
          await deleteInfoCandidate({ expId: windowWarning.value });
        }
        dispatch(setDefaultWindowWarning());
      }
    };
    handleWindow();
  }, [windowWarning]);

  return (
    <>
      {isOpen.education && (
        <AddEducation
          valueInput={{ ...educationInput }}
          listCareer={listCareer}
          listEdu={listEdu}
          isOpen={(value) => setIsOpen({ ...isOpen, education: value })}
          handleAccept={(value) => {
            return saveChange({
              education: { ...value, accountId: account.id },
            });
          }}
        />
      )}
      {isOpen.exp && (
        <AddExperience
          valueInput={{ ...expInput }}
          listCareer={listCareer}
          listFormOfWork={listFormOfWork}
          isOpen={(value) => setIsOpen({ ...isOpen, exp: value })}
          handleAccept={(value) => {
            return saveChange({ exp: { ...value, accountId: account.id } });
          }}
        />
      )}
      {isOpen.project && (
        <AddProject
          valueInput={{ ...projectInput }}
          listCareer={listCareer}
          isOpen={(value) => setIsOpen({ ...isOpen, project: value })}
          handleAccept={(value, image) => {
            return saveProject({ ...value }, image);
          }}
        />
      )}
      <div className="flex-1 flex flex-col p-5 bg-white rounded-2xl shadow-basic">
        <div className="relative flex-1">
          <Image
            src={
              imageValue.preview
                ? imageValue.preview
                : inputValue.image
                ? `${process.env.NEXT_PUBLIC_SERVER_PORT}media/${inputValue.image}`
                : ImageAccount2
            }
            alt="AccountImage"
            fill
            sizes="(max-width: 300px)"
            className="object-contain rounded-2xl shadow-basic"
          />
          <input
            type="file"
            ref={inputImage}
            className="absolute top-0 left-0 opacity-0 w-0 h-0"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            className="absolute bottom-5 right-5 w-[40px] h-[40px] bg-white fill-[#009DFF] stroke-0 stroke-[#009DFF] rounded-lg cursor-pointer duration-200 ease-in hover:fill-white hover:stroke-[25]"
            onClick={() => {
              inputImage.current.click();
            }}
          >
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm64 80a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM272 224c8.4 0 16.1 4.4 20.5 11.5l88 144c4.5 7.4 4.7 16.7 .5 24.3S368.7 416 360 416L88 416c-8.9 0-17.2-5-21.3-12.9s-3.5-17.5 1.6-24.8l56-80c4.5-6.4 11.8-10.2 19.7-10.2s15.2 3.8 19.7 10.2l26.4 37.8 61.4-100.5c4.4-7.1 12.1-11.5 20.5-11.5z" />
            </svg>
          </button>
        </div>
        <div className="flex-2 flex flex-col gap-5 p-5">
          {imageValue.image && (
            <div className="flex gap-3 items-center">
              <button
                className="flex-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                onClick={() => saveImage()}
              >
                Đổi ảnh
              </button>
              <button
                className="flex-1 bg-red-500 text-white rounded-lg border-2 border-red-500 scale-100 duration-200 ease-in hover:bg-white hover:text-red-500 active:scale-95"
                onClick={() => {
                  setImageValue({
                    image: null,
                    preview: null,
                  });
                  inputImage.current.value = "";
                }}
              >
                Hủy
              </button>
            </div>
          )}
          <div className="flex items-center py-1 border-b-2 border-zinc-200">
            <p className="flex-1">Email</p>
            <p className="flex-2 min-w-0 font-bold truncate">{account.email}</p>
          </div>
          <div className="flex items-center py-1 border-b-2 border-zinc-200">
            <p className="flex-1">Ngày tạo</p>
            <p className="flex-2 min-w-0 font-bold truncate">
              {formatDate(account.dateCreate)}
            </p>
          </div>
          <div className="flex items-center py-1 border-b-2 border-zinc-200">
            <p className="flex-1">Điện thoại</p>
            <p className="flex-2 min-w-0 font-bold truncate">
              {account.phoneNumber ? account.phoneNumber : "Không có"}
            </p>
          </div>
          <textarea
            name="decryption"
            className="flex-1 outline-none border-2 border-zinc-200 rounded-xl p-2"
            placeholder="Mô tả cá nhân"
            value={inputValue.decryption ?? ""}
            onChange={(e) =>
              setInputValue({ ...inputValue, decryption: e.target.value })
            }
          ></textarea>
        </div>
      </div>
      <div className="flex flex-2 flex-col gap-5">
        <div className="flex-1 flex flex-col p-5 gap-5 bg-white rounded-2xl shadow-basic overflow-auto no-scroll">
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Tên đầy đủ</p>
            <input
              type="text"
              name="name"
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={inputValue.name ?? ""}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
              placeholder="Nhập tên đầy đủ"
            />
          </div>
          <div className="z-8 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Địa chỉ</p>
            <InputAddress
              inputValue={inputValue.address ?? ""}
              handleChange={(value) =>
                setInputValue({ ...inputValue, address: value })
              }
            />
          </div>
          <div className="z-7 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Năm sinh</p>
            <InputDate
              inputValue={inputValue.birthday ?? ""}
              handleChange={(value) =>
                setInputValue({ ...inputValue, birthday: value })
              }
              isGiven={false}
            />
          </div>
          <div className="z-[6] flex flex-col p-5 gap-2 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Học vấn</p>
            {education &&
              education.length > 0 &&
              education.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 border-2 border-zinc-200 px-3 py-1 rounded-lg duration-200 ease-in hover:border-[#01215c]"
                  onClick={() => {
                    setEducationInput({
                      id: item.id,
                      name: item.name,
                      course: item.course,
                      degree: item.degree,
                      industry: item.industry,
                      decryption: item.decryption,
                    });
                    setIsOpen({ ...isOpen, education: true });
                  }}
                >
                  <div className="flex items-center gap-5">
                    <p className="flex-1 font-bold truncate">{item.name}</p>
                    <button
                      className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          setWindowWarning({
                            for: "DeleteEducation",
                            title: "Xóa học vấn",
                            content: `Bạn có chắc muốn xóa học vấn tại ${item.name}`,
                            handle: "pending",
                            type: "YorN",
                            isOpen: true,
                            value: item.id,
                          })
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
                  <hr></hr>
                  <div className="flex items-center gap-2">
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Bằng cấp
                      </p>
                      <p className="px-5 font-bold">{item.degree}</p>
                    </div>
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Lỉnh vực
                      </p>
                      <p className="px-5 font-bold">{item.industry}</p>
                    </div>
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Thời gian
                      </p>
                      <p className="px-5 font-bold">
                        {stringMonthYear(item.course)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            <button
              className="py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
              onClick={() => setIsOpen({ ...isOpen, education: true })}
            >
              Thêm học vấn
            </button>
          </div>
          <div className="z-[5] flex flex-col p-5 gap-2 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Kinh nghiệm</p>
            {exp &&
              exp.length > 0 &&
              exp.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 border-2 border-zinc-200 px-3 py-1 rounded-lg duration-200 ease-in hover:border-[#01215c]"
                  onClick={() => {
                    setExpInput({
                      id: item.id,
                      field: item.field,
                      formOfWork: item.formOfWork,
                      company: item.company,
                      executionTime: item.executionTime,
                      address: item.address,
                    });
                    setIsOpen({ ...isOpen, exp: true });
                  }}
                >
                  <div className="flex items-center gap-5">
                    <p className="flex-1 font-bold truncate">
                      Công ty - {item.company}
                    </p>
                    <button
                      className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          setWindowWarning({
                            for: "DeleteExperience",
                            title: "Xóa kinh nghiệm",
                            content: `Bạn có chắc muốn xóa kinh nghiệm tại ${item.company}`,
                            handle: "pending",
                            type: "YorN",
                            isOpen: true,
                            value: item.id,
                          })
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
                  <hr></hr>
                  <div className="flex items-center gap-2">
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Lỉnh vực
                      </p>
                      <p className="px-5 font-bold">{item.field}</p>
                    </div>
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Hình thức
                      </p>
                      <p className="px-5 font-bold">{item.formOfWork}</p>
                    </div>
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Thời gian
                      </p>
                      <p className="px-5 font-bold">
                        {stringMonthYear(item.executionTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            <button
              className="py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
              onClick={() => setIsOpen({ ...isOpen, exp: true })}
            >
              Thêm kinh nghiệm
            </button>
          </div>
          <div className="z-[4] flex flex-col p-5 gap-2 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Dự án</p>
            {project &&
              project.length > 0 &&
              project.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-1 border-2 border-zinc-200 px-3 py-1 rounded-lg duration-200 ease-in hover:border-[#01215c]"
                  onClick={() => {
                    setProjectInput({
                      id: item.id,
                      name: item.name,
                      executionTime: item.executionTime,
                      field: item.field,
                      link: item.link,
                      image: item.image,
                      decryption: item.decryption,
                    });
                    setIsOpen({ ...isOpen, project: true });
                  }}
                >
                  <div className="flex items-center gap-5">
                    <p className="flex-1 font-bold truncate">{item.name}</p>
                    <button
                      className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(
                          setWindowWarning({
                            for: "DeleteProject",
                            title: "Xóa dự án",
                            content: `Bạn có chắc muốn xóa dự án tại ${item.name}`,
                            handle: "pending",
                            type: "YorN",
                            isOpen: true,
                            value: item.id,
                          })
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
                  <hr></hr>
                  <div className="flex items-center gap-2">
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Kĩ năng
                      </p>
                      <p className="px-5 font-bold">{item.field}</p>
                    </div>
                    <div className="flex self-start items-center border-2 border-zinc-200 rounded-lg">
                      <p className="px-5 py-1 bg-zinc-400 text-white rounded-lg">
                        Thời gian
                      </p>
                      <p className="px-5 font-bold">
                        {stringMonthYear(item.executionTime)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            <button
              className="py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
              onClick={() => setIsOpen({ ...isOpen, project: true })}
            >
              Thêm dự án
            </button>
          </div>
          <div className="z-[3] flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Kỹ năng cá nhân</p>
            <InputAsTag
              listSearch={skill}
              inputValue={inputValue.skills ?? ""}
              handleChange={(value) =>
                setInputValue({ ...inputValue, skills: value })
              }
              placeholder="Nhập tên kỹ năng"
            />
          </div>
        </div>
        <ButtonDefault
          disabled={!isChange}
          classNameButton={
            isChange
              ? "py-1 bg-[#01215C] text-white rounded-xl border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
              : "py-1 bg-zinc-400 text-white border-2 border-zinc-400 rounded-xl duration-200 ease-in"
          }
          classNameWait="py-1 bg-[#01215C] rounded-xl border-2 border-[#01215C] scale-100 duration-200 ease-in"
          handleApi={() => {return saveChange()}}
          textButton={"Lưu thay đổi"}
        >
        </ButtonDefault>
      </div>
    </>
  );
}
