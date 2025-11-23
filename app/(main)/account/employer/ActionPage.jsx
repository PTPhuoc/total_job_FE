"use client";

import { setWeb } from "@/app/store/slices/webSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ImageAccount2 from "@/app/assets/Image_Account_2.png";
import Image from "next/image";
import { formatDate } from "@/app/function/handleDaytime";
import { setWindowWarning } from "@/app/store/slices/windowSlice";
import axios from "axios";
import ButtonDefault from "@/app/component/ButtonDefault";

export default function ActionPage({ accountInfor }) {
  const dispatch = useDispatch();
  const [account, setAccount] = useState(accountInfor);
  const [isChange, setIsChange] = useState(false);
  const [imageValue, setImageValue] = useState({
    image: null,
    preview: null,
  });
  const [inputValue, setInputValue] = useState(() => {
    if (account && account.employer) {
      return {
        name: account.employer.name ? account.employer.name : "",
        image: account.employer.image ? account.employer.image : "",
        decryption: account.employer.decryption
          ? account.employer.decryption
          : "",
      };
    }
    return {
      name: "",
      image: "",
      decryption: "",
    };
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
    if (account.employer) {
      Object.entries(inputValue).forEach(([key, value]) => {
        const matchValue1 = account.employer[key] ? account.employer[key] : "";
        const matchValue2 = value ? value : "";
        if (matchValue2.trim() !== matchValue1.trim()) {
          check = true;
        }
      });
    }
    return check;
  };

  const saveImage = async () => {
    const formData = new FormData();
    formData.append("image", imageValue.image);
    return axios
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

  const saveChange = async () => {
    return axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/save_employer/`,
        { valueChange: { ...inputValue } },
        { withCredentials: true }
      )
      .then((rs) => {
        if (rs.data.status === "Success") {
          setAccount({ ...rs.data.updatedAccount });
          setInputValue({ ...rs.data.updatedAccount.employer });
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

  useEffect(() => {
    setIsChange(checkChange());
  }, [inputValue]);

  return (
    <>
      <div className="flex flex-1 flex-col p-5 bg-white rounded-2xl shadow-basic ">
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
        </div>
      </div>
      <div className="flex flex-2 flex-col p-5 gap-5 bg-white rounded-2xl shadow-basic">
        <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Tên đầy đủ</p>
          <input
            type="text"
            name="name"
            className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            value={inputValue.name}
            onChange={(e) =>
              setInputValue({ ...inputValue, name: e.target.value })
            }
            placeholder="Nhập tên đầy đủ"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 border-2 border-zinc-200 rounded-xl">
          <p className="px-5">Mô tả</p>
          <textarea
            type="text"
            name="name"
            className="outline-none flex-1 border-y-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
            value={inputValue.decryption}
            onChange={(e) =>
              setInputValue({ ...inputValue, decryption: e.target.value })
            }
            placeholder="Nhập tên đầy đủ"
          ></textarea>
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
