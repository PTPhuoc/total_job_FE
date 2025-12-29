"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageAccount2 from "@/app/assets/Image_Account_2.png";
import { formatDate } from "@/app/function/handleDaytime";
import PreviewEducation from "./PreviewEducation";
import PreviewExp from "./PreviewExp";
import PreviewProject from "./PreviewProject";
import axios from "axios";
import { setDefaultWindowWarning, setWindowWarning } from "@/app/store/slices/windowSlice";

export default function ActionPage({ profile }) {
  const windowWarning = useSelector(state => state.windowWarning)
  const dispatch = useDispatch();
  const [applied, setApplied] = useState(profile.applied);
  
  const [profileCandidate, setProfileCandidate] = useState(
    profile.candidateProfile
  );
  const [education, setEducation] = useState(
    profile.candidateProfile.education ? [...profile.candidateProfile.education] : []
  );
  const [exp, setExp] = useState(profile.candidateProfile.exp ? [...profile.candidateProfile.exp] : []);
  const [project, setProject] = useState(
    profile.candidateProfile.project ? [...profile.candidateProfile.project] : []
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
  const [isOpen, setIsOpen] = useState({
    education: false,
    exp: false,
    project: false,
  });

  const stringMonthYear = (value) => {
    const [start, end] = (value ?? "").split("-");
    const [startMonth, startYear] = (start ?? "").split(",");
    const [endMonth, endYear] = (end ?? "").split(",");
    return `${startMonth && startMonth + "/"}${startYear} - ${
      endMonth && endMonth + "/"
    }${endYear}`;
  };

  const handleApplied = async (value) => {
    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/handle_apply/`,
        { applyValue: { id: applied.id, status: value } },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setApplied(rs.data.appliedUpdate);
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

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  useEffect(( ) => {
    const handleWindow = async () => {
      if(windowWarning.handle === "accept"){
        if(windowWarning.for === "AcceptApplied"){
          await handleApplied("accept")
        }
        if(windowWarning.for === "RejectApplied"){
          await handleApplied("reject")
        }
        dispatch(setDefaultWindowWarning())
      }
    }
    handleWindow()
  }, [windowWarning])

  return (
    <>
      {isOpen.education && (
        <PreviewEducation
          valueInput={{ ...educationInput }}
          isOpen={() => setIsOpen({ ...isOpen, education: false })}
        />
      )}
      {isOpen.exp && (
        <PreviewExp
          valueInput={expInput}
          isOpen={() => setIsOpen({ ...isOpen, exp: false })}
        />
      )}
      {isOpen.project && (
        <PreviewProject
          valueInput={projectInput}
          isOpen={() => setIsOpen({ ...isOpen, project: false })}
        />
      )}
      <div className="relative flex-1 flex flex-col p-5 gap-5 bg-white rounded-2xl shadow-basic">
        <div className="relative flex-1 min-h-[250px]">
          <Image
            src={
              profileCandidate.candidate.image
                ? `${process.env.NEXT_PUBLIC_SERVER_PORT}media/${profileCandidate.candidate.image}`
                : ImageAccount2
            }
            alt="AccountImage"
            fill
            sizes="(max-width: 300px)"
            className="object-contain rounded-2xl shadow-basic"
          />
        </div>
        <div className="flex items-center py-1 border-b-2 border-zinc-200">
          <p className="flex-1">Email</p>
          <p className="flex-2 min-w-0 font-bold truncate">
            {profileCandidate.email}
          </p>
        </div>
        <div className="flex items-center py-1 border-b-2 border-zinc-200">
          <p className="flex-1">Điện thoại</p>
          <p className="flex-2 min-w-0 font-bold truncate">
            {profileCandidate.phoneNumber
              ? profileCandidate.phoneNumber
              : "Không có"}
          </p>
        </div>
        <p className="flex-1 text-justify whitespace-pre-wrap border-2 border-zinc-200 rounded-xl p-2 overflow-auto no-scroll">
          <span className="font-bold">Mô tả</span>
          <br />
          {profileCandidate.candidate.decryption}
        </p>
        {applied.status === "accept" && (
          <p className="px-5 py-1 bg-[#01215c] text-white rounded-lg border-2 border-[#01215c] scale-100 duration-200 ease-in">
            Bạn đã duyệt hồ sơ này
          </p>
        )}
        {applied.status === "reject" && (
          <p className="px-5 py-1 bg-[#01215c] text-white rounded-lg border-2 border-[#01215c] scale-100 duration-200 ease-in">
            Bạn đã từ chối hồ sơ này
          </p>
        )}
        {(applied.status === "seen" || applied.status === "pending") && (
          <>
            <button
              onClick={() => {
                dispatch(
                  setWindowWarning({
                    for: "AcceptApplied",
                    title: "Duyệt hồ sơ",
                    content: "Bạn có chắc muốn duyệt hồ sơ này!",
                    handle: "pending",
                    type: "YorN",
                    isOpen: true,
                    value: "accept",
                  })
                );
              }}
              className="py-1 bg-[#01215c] text-white rounded-lg border-2 border-[#01215c] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215c] active:scale-95"
            >
              Xét duyệt
            </button>
            <button
              onClick={() => {
                dispatch(
                  setWindowWarning({
                    for: "RejectApplied",
                    title: "Từ chối hồ sơ",
                    content: "Bạn có chắc từ chối hồ sơ này!",
                    handle: "pending",
                    type: "YorN",
                    isOpen: true,
                    value: "reject",
                  })
                );
              }}
              className="py-1 bg-[#01215c] text-white rounded-lg border-2 border-[#01215c] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215c] active:scale-95"
            >
              Từ chối
            </button>
          </>
        )}
      </div>
      <div className="flex-2 flex flex-col p-5 gap-5 bg-white rounded-2xl shadow-basic overflow-auto no-scroll">
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Tên đầy đủ</p>
          <p className="border-b-2 border-zinc-200">
            {profileCandidate.candidate.name}
          </p>
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Địa chỉ</p>
          <p className="border-b-2 border-zinc-200">
            {profileCandidate.candidate.address
              ? profileCandidate.candidate.address?.replace(/,/g, ", ")
              : "Không có"}
          </p>
        </div>
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Năm sinh</p>
          <p className="border-b-2 border-zinc-200">
            {profileCandidate.candidate.birthday
              ? formatDate(profileCandidate.candidate.birthday)
              : "Không có"}
          </p>
        </div>
        <div className="z-[6] flex flex-col p-5 gap-2 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Học vấn</p>
          {education &&
            education.length > 0 &&
            education.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 border-2 border-zinc-200 px-3 py-1 rounded-lg cursor-pointer duration-200 ease-in hover:border-[#01215c]"
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
                <p className="flex-1 font-bold truncate">{item.name}</p>
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
        </div>
        <div className="z-[6] flex flex-col p-5 gap-2 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Kinh nghiệm</p>
          {exp &&
            exp.length > 0 &&
            exp.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 border-2 border-zinc-200 px-3 py-1 rounded-lg cursor-pointer duration-200 ease-in hover:border-[#01215c]"
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
                <p className="flex-1 font-bold truncate">
                  Công ty - {item.company}
                </p>
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
        </div>
        <div className="z-[6] flex flex-col p-5 gap-2 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Dự án</p>
          {project &&
            project.length > 0 &&
            project.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-1 border-2 border-zinc-200 px-3 py-1 rounded-lg cursor-pointer duration-200 ease-in hover:border-[#01215c]"
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
                <p className="flex-1 font-bold truncate">{item.name}</p>
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
        </div>
        <div className="flex flex-col p-5 gap-3 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">kỹ năng cá nhân</p>
          {(() => {
            const listSkill = profileCandidate.candidate.skills
              ? profileCandidate.candidate.skills.split(",")
              : [];
            if (listSkill.length > 0) {
              return listSkill.map((item, index) => (
                <p
                  key={index}
                  className="px-5 py-1 border-[#01215C] border-2 rounded-lg"
                >
                  {item}
                </p>
              ));
            } else {
              return <p className="px-5 py-1">Không có</p>;
            }
          })()}
        </div>
      </div>
    </>
  );
}
