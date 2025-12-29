"use client";

import ButtonDefault from "@/app/component/ButtonDefault";
import InputListSearch from "@/app/component/InputListSearch";
import InputMonthAndYear from "@/app/component/InputMonthAndYear";
import React, { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function AddProject({
  valueInput,
  listCareer,
  isOpen,
  handleAccept,
}) {
  const [inputValue, setInputValue] = useState({
    id: valueInput.id ?? "",
    name: valueInput.name ?? "",
    field: valueInput.field ?? "",
    link: valueInput.link ?? "",
    image: valueInput.image ?? "",
    executionTime: valueInput.executionTime ?? "",
    decryption: valueInput.decryption ?? "",
  });
  const [isOption, setIsOption] = useState({
    link: false,
    image: false,
  });

  const [imageValue, setImageValue] = useState({
    image: "",
    preview: "",
  });

  const [showImage, setShowImage] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setIsOption({ ...isOption, image: true });
    setImageValue({ preview: previewUrl, image: file });
  };

  const inputImage = useRef(null);

  const checkChange = () => {
    if (valueInput.id) {
      for (const [key, value] of Object.entries(inputValue)) {
        if (key === "id") continue;
        const matchValue = valueInput[key] ? valueInput[key].trim() : "";
        if (matchValue !== value.trim()) return true;
      }
      return false;
    } else {
      if (!inputValue.link && !inputValue.image) return false;
      for (const [key, value] of Object.entries(inputValue)) {
        if (
          key === "decryption" ||
          key === "id" ||
          key === "link" ||
          key === "image"
        )
          continue;
        if (!value && !value.trim()) return false;
      }
      return true;
    }
  };

  const [start = "", end = ""] = (inputValue.executionTime || "").split("-");

  const [isHandle, setIsHandle] = useState(false);

  const isChange = checkChange();

  return (
    <div className="absolute z-9 w-full h-full py-5 top-0 left-0 flex justify-center items-center bg-[rgba(255,255,255,0.5)]">
      <Lightbox
        open={showImage}
        close={() => setShowImage(false)}
        slides={[
          { src: inputValue.image ? `${process.env.NEXT_PUBLIC_SERVER_PORT}media/${inputValue.image}` : imageValue.preview },
        ]}
      />
      <div className="w-4/5 h-full flex flex-col rounded-2xl shadow-basic bg-white overflow-hidden">
        <p className="bg-[#009DFF] text-white font-bold p-5">Thêm dự án</p>
        <div className="flex-1 flex flex-col p-5 gap-5 overflow-auto no-scroll">
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Tên dự án</p>
            <input
              type="text"
              name="nameProject"
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  name: e.target.value,
                })
              }
              placeholder="Nhập tên dự án"
            />
          </div>
          <div className="z-9 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Kỹ năng</p>
            <InputListSearch
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              inputValue={inputValue.field}
              inputChange={(value) =>
                setInputValue({ ...inputValue, field: value })
              }
              listSearch={listCareer}
              placeHolder="Nhập kỹ năng"
              showlist={(item, index) => {
                return (
                  <div
                    key={index}
                    className="text-left bg-white px-5 py-2 cursor-pointer duration-200 ease-in hover:bg-zinc-200"
                    onClick={() => {
                      setInputValue({
                        ...inputValue,
                        field: item.name,
                      });
                    }}
                  >
                    {item.name}
                  </div>
                );
              }}
            />
          </div>
          <div className="z-8 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Phương tiện tuyền thông</p>
            <div className="flex items-center gap-5">
              <input
                ref={inputImage}
                type="file"
                accept="image/*"
                className="h-0 w-0 hidden"
                onChange={handleFileChange}
              ></input>
              {(isOption.link || inputValue.link) && (
                <>
                  <input
                    type="text"
                    className="outline-none flex-1 border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
                    placeholder="Nhập đường dẩn"
                    value={inputValue.link}
                    name="link"
                    onChange={(e) =>
                      setInputValue({ ...inputValue, link: e.target.value })
                    }
                  />
                  <button
                    className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                    onClick={() => {
                      setIsOption({ ...isOption, link: false });
                      setInputValue({ ...inputValue, link: "" });
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
                </>
              )}
              {(imageValue.image || inputValue.image) && (
                <>
                  <button
                    onClick={() => setShowImage(true)}
                    className="flex-1 py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                  >
                    Xem ảnh
                  </button>
                  <button
                    className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                    onClick={() => {
                      setInputValue({
                        ...inputValue,
                        image: "",
                      });
                      setImageValue({ image: "", preview: "" });
                      setIsOption({ ...isOption, image: false });
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
                </>
              )}
              {!isOption.link &&
                !isOption.image &&
                !inputValue.image &&
                !inputValue.link && (
                  <>
                    <button
                      onClick={() => setIsOption({ ...isOption, link: true })}
                      className="flex-1 py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                    >
                      Đường dẩn (Link)
                    </button>
                    <button
                      onClick={() => inputImage.current.click()}
                      className="flex-1 py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                    >
                      Hình ảnh (Picture)
                    </button>
                  </>
                )}
            </div>
          </div>
          <div className="z-5 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Thời gian thực hiện</p>
            <div className="flex items-center">
              <div className="z-2 flex-1 flex items-center gap-5">
                <p>Bắt đầu (tháng/ năm)</p>
                <InputMonthAndYear
                  overYear={false}
                  valueInput={start}
                  handleChange={(value) =>
                    setInputValue({
                      ...inputValue,
                      executionTime: `${value}-${end}`,
                    })
                  }
                />
              </div>
              <div className="z-1 flex-1 flex items-center gap-5">
                <p>Kết thúc (tháng/ năm)</p>
                <InputMonthAndYear
                  valueInput={end}
                  handleChange={(value) =>
                    setInputValue({
                      ...inputValue,
                      executionTime: `${start}-${value}`,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Mô tả</p>
            <textarea
              value={inputValue.decryption}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  decryption: e.target.value,
                })
              }
              className="outline-none max-h-[300px] min-h-[100px] border-y-2 border-zinc-200 duration-200 ease-in hover:border-[#01215c]"
              placeholder="Nhập mô tả"
            ></textarea>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-end p-5">
          {!isHandle && (
            <button
              onClick={() => isOpen(false)}
              className="px-5 py-1 bg-red-500 text-white rounded-lg border-2 border-red-500 scale-100 duration-200 ease-in hover:bg-white hover:text-red-500 active:scale-95"
            >
              {inputValue.id ? "Hủy cập nhật" : "Hủy tạo"}
            </button>
          )}

          <ButtonDefault
            disable={!isChange}
            handleApi={() => {
              setIsHandle(true);
              return handleAccept({ ...inputValue }, imageValue.image);
            }}
            classNameButton={
              isChange
                ? "px-5 py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                : "px-5 py-1 bg-zinc-500 text-white rounded-lg border-2 border-zinc-500 scale-100 duration-200 ease-in"
            }
            classNameWait="px-5 py-1 rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in"
            textButton={inputValue.id ? "Cập nhật" : "Xác nhận"}
          ></ButtonDefault>
        </div>
      </div>
    </div>
  );
}
