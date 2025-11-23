"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageAccount2 from "@/app/assets/Image_Account_2.png";
import { formatDate } from "@/app/function/handleDaytime";

export default function ActionPage({ profile }) {
  const dispatch = useDispatch();
  const [profileCandidate, setProfileCandidate] = useState(profile);

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);
  
  return (
    <>
      <div className="flex-1 flex flex-col p-5 gap-5 bg-white rounded-2xl shadow-basic">
        <div className="relative flex-1">
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
        <p className="flex-1 text-justify whitespace-pre-wrap border-2 border-zinc-200 rounded-xl p-2">
          <span className="font-bold">Mô tả</span>
          <br />
          {profileCandidate.candidate.decryption}
        </p>
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
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Học vấn</p>
          <p className="border-b-2 border-zinc-200">
            {profileCandidate.candidate.education
              ? profileCandidate.candidate.education
              : "Không có"}
          </p>
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
