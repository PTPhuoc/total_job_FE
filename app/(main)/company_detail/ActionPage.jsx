"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ActionPage({ companyInfo }) {
  const dispatch = useDispatch();
  const [company, setCompany] = useState(companyInfo);

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  return (
    <div className="mt-[100px] flex flex-col justify-center items-center">
      <div className="w-4/5 py-5 gap-5 flex flex-col h-[820px]">
        <div className="flex gap-5">
          <div className="flex flex-1 p-5 bg-white rounded-2xl shadow-basic">
            <div className="flex items-center gap-5">
              {company.image === "noImage" ? (
                <div className="w-[150px] h-[150px] border-2 border-[#01215C] rounded-2xl overflow-hidden">
                  <svg
                    className="w-full h-full fill-zinc-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M288 48c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 48 48 0 0-72c0-13.3 10.7-24 24-24s24 10.7 24 24l0 72 16 0c26.5 0 48 21.5 48 48l0 320c0 26.5-21.5 48-48 48l-256 0c-26.5 0-48-21.5-48-48l0-416zm64 64l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM352 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM528 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM512 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM96 480l0-160-16 0c-44.2 0-80-35.8-80-80 0-26.7 13.1-50.3 33.2-64.9-.8-4.9-1.2-10-1.2-15.1 0-53 43-96 96-96s96 43 96 96l0 96c0 35.3-28.7 64-64 64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32z" />
                  </svg>
                </div>
              ) : (
                <div className="relative w-[150px] h-[150px] border-2 border-[#01215C] rounded-2xl overflow-hidden">
                  <Image
                    fill
                    alt={company.image}
                    src={`${process.env.NEXT_PUBLIC_SERVER_PORT}media/${company.image}`}
                    sizes="(max-width: 768px), (max-width: 1200px)"
                    className="object-none"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 flex-1">
                <p className="w-full min-w-0 truncate font-bold">
                  {company.name}
                </p>
                {company.scale !== "noText" && (
                  <p>
                    Quy mô: <span>{company.scale}</span>
                  </p>
                )}
                {company.field !== "noText" && (
                  <div className="flex items-center gap-3">
                    <p>Lĩnh vực:</p>
                    <button className="px-3 border-2 border-[#009DFF] rounded-lg duration-200 ease-in hover:text-[#009DFF]">
                      {company.field}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center p-5 gap-5 rounded-2xl bg-white shadow-basic">
            <div className="flex gap-3 items-stretch">
              <p className="flex-1 px-3 py-1 shrink-0 flex justify-center items-center bg-zinc-400 text-white border-b-2 border-zinc-400 rounded-lg">
                Địa chỉ
              </p>
              {company.address && company.address !== "noText" ? (
                <p className="flex-9 flex items-center border-b-2 border-[#01215C]">
                  {company.address}
                </p>
              ) : (
                <p className="flex-9 flex items-center border-b-2 border-[#01215C]">
                  Không có
                </p>
              )}
            </div>

            <div className="flex gap-3 items-stretch">
              <p className="flex-1 px-3 py-1 shrink-0 flex justify-center items-center bg-zinc-400 text-white border-b-2 border-zinc-400 rounded-lg">
                Link
              </p>
              {company.link && company.link !== "noText" ? (
                <p className="flex-9 flex items-center border-b-2 border-[#01215C]">
                  {company.link}
                </p>
              ) : (
                <p className="flex-9 flex items-center border-b-2 border-[#01215C]">
                  Không có
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 min-h-[300px] p-5 flex flex-col bg-white rounded-2xl shadow-basic">
          <p className="font-bold">Mô tả công ty</p>
          {company.decryption != "noText" ? (
            <p className="text-justify">{company.decryption}</p>
          ) : (
            <p className="w-full h-[300px] flex items-center justify-center">
              Không có mô tả công ty
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
