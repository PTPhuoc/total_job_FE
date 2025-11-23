"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";
import ImageAccount2 from "@/app/assets/Image_Account_2.png";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { formatDate } from "@/app/function/handleDaytime";
import InputListSearch from "@/app/component/InputListSearch";
import ButtonDefault from "@/app/component/ButtonDefault";
import InputDate from "@/app/component/InputDate";
import InputAddress from "@/app/component/InputAddress";

export default function ActionPage({ companyInfo, listFieldValue }) {
  const dispatch = useDispatch();
  const [company, setCompany] = useState(companyInfo);
  const [inputValue, setInputValue] = useState({
    name: company.name ? company.name : "",
    link: company.link ? company.link : "",
    address: company.address ? company.address : "",
    image: company.image ? company.image : "",
    scale: company.scale ? company.scale : "",
    field: company.field ? company.field : "",
    decryption: company.decryption ? company.decryption : "",
  });
  const [isChange, setIsChange] = useState(false);
  const [imageValue, setImageValue] = useState({
    image: null,
    preview: null,
  });

  const inputImage = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImageValue({ preview: previewUrl, image: file });
  };

  const checkChange = () => {
    let check = false;
    if (company) {
      Object.entries(inputValue).forEach(([key, value]) => {
        const matchValue1 = company[key] ? company[key] : "";
        const matchValue2 = value ? value : "";
        if (matchValue2.trim() !== matchValue1.trim()) {
          check = true;
        }
      });
    }
    return check;
  };

  const saveChange = async () => {
    return axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_company_employer/`,
        { valueChange: { ...inputValue } },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setCompany({ ...rs.data.updatedCompany });
          setInputValue({ ...rs.data.updatedCompany });
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

  const saveImage = async () => {
    const formData = new FormData();
    formData.append("image", imageValue.image);
    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_image_company_employer/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue({ ...inputValue, image: rs.data.image });
          setCompany({ ...company, image: rs.data.image });
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

  useEffect(() => {
    setIsChange(checkChange());
  }, [inputValue]);

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  return (
    <>
      <div className="flex flex-1 flex-col gap-5 p-5 bg-white rounded-2xl shadow-basic">
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
          <p className="flex-1">Ngày tạo</p>
          <p className="flex-2 min-w-0 font-bold truncate">
            {formatDate(company.dateCreate)}
          </p>
        </div>
      </div>
      <div className="flex flex-2 flex-col gap-5">
        <div className="flex flex-1 flex-col gap-5 p-5 bg-white rounded-2xl shadow-basic overflow-auto no-scroll">
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Tên công ty</p>
            <input
              type="text"
              name="name"
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
              placeholder="Nhập tên công ty"
            />
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Liên kết của công ty (link)</p>
            <input
              type="text"
              name="link"
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={inputValue.link}
              onChange={(e) =>
                setInputValue({ ...inputValue, link: e.target.value })
              }
              placeholder="Nhập liên kết của công ty"
            />
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Quy mô/Người</p>
            <input
              type="text"
              name="scale"
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={inputValue.scale}
              onChange={(e) =>
                setInputValue({ ...inputValue, scale: e.target.value })
              }
              placeholder="Nhập quy mô"
            />
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Địa chỉ</p>
            <InputAddress
              handleChange={(value) =>
                setInputValue({ ...inputValue, address: value })
              }
              inputValue={inputValue.address}
            />
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Lĩnh vực</p>
            <InputListSearch
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              listSearch={listFieldValue}
              placeHolder="Tên lĩnh vực"
              inputValue={inputValue.field}
              inputChange={(value) =>
                setInputValue({ ...inputValue, field: value })
              }
              showlist={(item, index) => {
                return (
                  <div
                    key={index}
                    className="text-left bg-white px-5 py-2 cursor-pointer duration-200 ease-in hover:bg-zinc-200"
                    onClick={() => {
                      setInputValue({ ...inputValue, field: item.name });
                    }}
                  >
                    {item.name}
                  </div>
                );
              }}
            />
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Mô tả</p>
            <textarea
              name="name"
              className="outline-none h-[300px] border-y-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={inputValue.decryption}
              onChange={(e) =>
                setInputValue({ ...inputValue, decryption: e.target.value })
              }
              placeholder="Nhập mô tả"
            />
          </div>
        </div>

        <ButtonDefault
          disable={!isChange}
          classNameButton={
            isChange
              ? "py-1 bg-[#01215C] text-white rounded-xl border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
              : "py-1 bg-zinc-400 text-white border-2 border-zinc-400 rounded-xl duration-200 ease-in"
          }
          textButton={"Lưu thay đổi"}
          handleApi={() => {
            return saveChange();
          }}
        />
      </div>
    </>
  );
}
