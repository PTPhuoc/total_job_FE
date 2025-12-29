"use client";

import ButtonDefault from "@/app/component/ButtonDefault";
import InputListSearch from "@/app/component/InputListSearch";
import InputMonthAndYear from "@/app/component/InputMonthAndYear";
import React, { useState } from "react";

export default function AddEducation({
  valueInput,
  listCareer,
  listEdu,
  isOpen,
  handleAccept,
}) {
  const [educationInput, setEducationInput] = useState({
    id: valueInput.id ?? "",
    name: valueInput.name ?? "",
    degree: valueInput.degree ?? "",
    industry: valueInput.industry ?? "",
    course: valueInput.course ?? "",
    decryption: valueInput.decryption ?? "",
  });

  const checkChange = () => {
    if (valueInput.id) {
      for (const [key, value] of Object.entries(educationInput)) {
        if (key === "id") continue;
        const matchValue = valueInput[key] ? valueInput[key].trim() : "";
        if (value.trim() && matchValue !== value.trim()) return true;
      }
      return false;
    } else {
      for (const [key, value] of Object.entries(educationInput)) {
        if (key === "decryption" || key === "id") continue;
        if (!value && !value.trim()) return false;
      }
      return true;
    }
  };

  const [isHandle, setIsHandle] = useState(false);

  const isChange = checkChange();

  const [start = "", end = ""] = (educationInput.course || "").split("-");

  return (
    <div className="absolute z-9 w-full h-full py-5 top-0 left-0 flex justify-center items-center bg-[rgba(255,255,255,0.5)]">
      <div className="w-4/5 h-full flex flex-col rounded-2xl shadow-basic bg-white overflow-hidden">
        <p className="bg-[#009DFF] text-white font-bold p-5">Thêm học vấn</p>
        <div className="flex-1 flex flex-col p-5 gap-5 overflow-auto no-scroll">
          <div className="z-9 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Tên trường</p>
            <InputListSearch
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              inputValue={educationInput.name}
              inputChange={(value) =>
                setEducationInput({ ...educationInput, name: value })
              }
              listSearch={listEdu}
              placeHolder="nhập Tên/Mã trường"
              showlist={(item, index) => {
                return (
                  <div
                    key={index}
                    className="text-left bg-white px-5 py-2 cursor-pointer duration-200 ease-in hover:bg-zinc-200"
                    onClick={() => {
                      setEducationInput({
                        ...educationInput,
                        name: item.name,
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
            <p className="px-5">Bằng cấp</p>
            <input
              type="text"
              name="degree"
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              value={educationInput?.degree}
              onChange={(e) =>
                setEducationInput({
                  ...educationInput,
                  degree: e.target.value,
                })
              }
              placeholder="Nhập bằng cấp"
            />
          </div>
          <div className="z-7 flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Chuyên ngành</p>
            <InputListSearch
              className="outline-none border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]"
              inputValue={educationInput.industry}
              inputChange={(value) =>
                setEducationInput({ ...educationInput, industry: value })
              }
              listSearch={listCareer}
              placeHolder="Nhập chuyên ngành"
              showlist={(item, index) => {
                return (
                  <div
                    key={index}
                    className="text-left bg-white px-5 py-2 cursor-pointer duration-200 ease-in hover:bg-zinc-200"
                    onClick={() => {
                      setEducationInput({
                        ...educationInput,
                        industry: item.name,
                      });
                    }}
                  >
                    {item.name}
                  </div>
                );
              }}
            />
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Khóa học</p>
            <div className="flex items-center">
              <div className="z-2 flex-1 flex items-center gap-5">
                <p>Bắt đầu (tháng/ năm)</p>
                <InputMonthAndYear
                  overYear={false}
                  valueInput={start}
                  handleChange={(value) =>
                    setEducationInput({
                      ...educationInput,
                      course: `${value}-${end}`,
                    })
                  }
                />
              </div>
              <div className="z-1 flex-1 flex items-center gap-5">
                <p>Kết thúc (tháng/ năm)</p>
                <InputMonthAndYear
                  valueInput={end}
                  handleChange={(value) =>
                    setEducationInput({
                      ...educationInput,
                      course: `${start}-${value}`,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Mô tả</p>
            <textarea
              value={educationInput?.decryption}
              onChange={(e) =>
                setEducationInput({
                  ...educationInput,
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
              {educationInput.id ? "Hủy cập nhật" : "Hủy tạo"}
            </button>
          )}

          <ButtonDefault
            disable={!isChange}
            handleApi={() => {
              setIsHandle(true);
              return handleAccept({ ...educationInput });
            }}
            classNameButton={
              isChange
                ? "px-5 py-1 bg-[#01215C] text-white rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                : "px-5 py-1 bg-zinc-500 text-white rounded-lg border-2 border-zinc-500 scale-100 duration-200 ease-in"
            }
            classNameWait="px-5 py-1 rounded-lg border-2 border-[#01215C] scale-100 duration-200 ease-in"
            textButton={educationInput.id ? "Cập nhật" : "Xác nhận"}
          ></ButtonDefault>
        </div>
      </div>
    </div>
  );
}
