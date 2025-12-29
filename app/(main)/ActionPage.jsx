"use client";

import Image from "next/image";
import ImageListJob1 from "../assets/Image_ListJob_1.jpg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setWeb } from "../store/slices/webSlice";
import { listCity } from "../data";
import InputListSearch from "../component/InputListSearch";
import HorizontalScroll from "../component/HorizontalListSearch";
import { setWindowWarning } from "../store/slices/windowSlice";
import Link from "next/link";

export default function ActionPage({
  careers,
  levels,
  experiences,
  salarys,
  formOfWorks,
  jobs,
}) {
  const dispatch = useDispatch();
  const [listAddress, setListAddress] = useState(listCity);
  const [listCareer, setListCareer] = useState(careers);
  const [listLevel, setListLevel] = useState(levels);
  const [listExp, setListExp] = useState(experiences);
  const [listSalary, setListSalary] = useState(salarys);
  const [listFormOfWork, setListFormOfWork] = useState(formOfWorks);
  const [listJob, setListJob] = useState(jobs.listJob);
  const [searchValue, setSearchValue] = useState({
    job: "",
    address: "",
    career: "",
    salary: "",
    exp: "",
    formOfWork: "",
  });
  const [changePage, setChangePage] = useState({
    page: jobs.page,
    total: jobs.total,
    pageSize: jobs.limit,
    totalPage: jobs.totalPages,
  });
  const router = useRouter();

  const getField = (fields, nameField) => {
    const fieldValue = fields.find((item) =>
      nameField.includes(item.title.toLowerCase())
    );
    return fieldValue ? fieldValue.requestText : null;
  };

  const getListField = (fields, nameField) => {
    const listField = fields.filter(
      (item) => item.title.toLowerCase() === nameField.toLowerCase()
    );
    return listField;
  };

  const searchJob = async (page) => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/job/get/`, {
        params: {
          searchValue: JSON.stringify({
            ...searchValue,
          }),
          page: page,
        },
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setListJob(rs.data.listJob);
          setChangePage({
            page: rs.data.page,
            total: rs.data.total,
            pageSize: rs.data.limit,
            totalPage: rs.data.totalPages,
          });
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

  return (
    <div className="py-[100px] flex flex-col w-full h-full gap-5">
      <div className="w-full h-[300px] flex justify-center items-center z-[5]">
        <div className="relative w-4/5 h-full py-5">
          <Image
            className="w-full h-full rounded-2xl shadow-basic object-cover"
            src={ImageListJob1}
            alt="ImageListJob1"
            priority
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <p className="w-2/4 text-[60px] font-bold text-center py-5 bg-[rgba(224,224,224,0.5)] rounded-2xl">
              TÌM TUYỂN DỤNG
            </p>
          </div>
          <div className="absolute w-full bottom-0 flex justify-center items-center">
            <div className="flex gap-5 w-4/5 items-center translate-y-1/5">
              <div className="relative flex flex-2 p-3 bg-white rounded-2xl items-center">
                <div className="w-[30px] h-[30px] fill-[#01215C]">
                  <svg
                    className="w-[30px] h-[30px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </div>
                <input
                  className="flex flex-1 outline-none pl-2 pr-[15%]"
                  type="text"
                  value={searchValue.job}
                  onChange={(e) =>
                    setSearchValue({ ...searchValue, job: e.target.value })
                  }
                  placeholder="Tên tuyển dụng"
                />
                <div className="absolute top-0 right-0 h-full">
                  <button
                    onClick={() => searchJob(changePage.page)}
                    className="px-5 h-full bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-300 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
              <InputListSearch
                className="flex flex-1 p-3 bg-white rounded-2xl items-center"
                placeHolder="Địa chỉ"
                inputValue={searchValue.address}
                inputChange={(value) =>
                  setSearchValue({ ...searchValue, address: value })
                }
                iconShow={
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
                  </svg>
                }
                listSearch={listAddress}
                showlist={(item, index) => {
                  return (
                    <button
                      className="text-left bg-white px-5 py-2 duration-200 ease-in hover:bg-zinc-200"
                      key={index}
                      onClick={() =>
                        setSearchValue({ ...searchValue, address: item.name })
                      }
                    >
                      {item.name}
                    </button>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-[10px] flex justify-center items-center z-[4]">
        <div className="w-4/5 flex flex-col gap-5 justify-center items-center">
          <div className="w-4/5 flex gap-5 justify-center items-center">
            <InputListSearch
              className="flex flex-2 p-3 items-center bg-white rounded-2xl"
              placeHolder="Hình thức làm việc"
              inputValue={searchValue.formOfWork}
              inputChange={(value) =>
                setSearchValue({ ...searchValue, formOfWork: value })
              }
              iconShow={
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 424 224 0 0-424c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM416 96l0 384 32 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64l-32 0zM96 480l0-384-32 0C28.7 96 0 124.7 0 160L0 416c0 35.3 28.7 64 64 64l32 0z" />
                </svg>
              }
              listSearch={listFormOfWork}
              showlist={(item, index) => {
                return (
                  <button
                    className="text-left bg-white px-5 py-2 duration-200 ease-in hover:bg-zinc-200"
                    key={index}
                    onClick={() => {}}
                  >
                    {item.name}
                  </button>
                );
              }}
            />
            <InputListSearch
              className="flex flex-2 p-3 items-center bg-white rounded-2xl"
              placeHolder="Mức lương"
              inputValue={searchValue.salary}
              inputChange={(value) =>
                setSearchValue({ ...searchValue, salary: value })
              }
              iconShow={
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm192 24c0 4.4-3.6 8.1-8 7.5-29-3.6-51.9-26.6-55.5-55.5-.5-4.4 3.1-8 7.5-8l48 0c4.4 0 8 3.6 8 8l0 48zM64 328c0-4.4 3.6-8.1 8-7.5 29 3.6 51.9 26.6 55.5 55.5 .5 4.4-3.1 8-7.5 8l-48 0c-4.4 0-8-3.6-8-8l0-48zm8-136.5c-4.4 .5-8-3.1-8-7.5l0-48c0-4.4 3.6-8 8-8l48 0c4.4 0 8.1 3.6 7.5 8-3.6 29-26.6 51.9-55.5 55.5zm368 129c4.4-.5 8 3.1 8 7.5l0 48c0 4.4-3.6 8-8 8l-48 0c-4.4 0-8.1-3.6-7.5-8 3.6-29 26.6-51.9 55.5-55.5z" />
                </svg>
              }
              listSearch={listSalary}
              showlist={(item, index) => {
                return (
                  <button
                    className="text-left bg-white px-5 py-2 duration-200 ease-in hover:bg-zinc-200"
                    key={index}
                    onClick={() => {}}
                  >
                    {item.name}
                  </button>
                );
              }}
            />
            <InputListSearch
              className="flex flex-1 p-3 items-center bg-white rounded-2xl"
              placeHolder="Kinh nghiệm"
              inputValue={searchValue.exp}
              inputChange={(value) =>
                setSearchValue({ ...searchValue, exp: value })
              }
              iconShow={
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M292.9 384c7.3-22.3 21.9-42.5 38.4-59.9 32.7-34.4 52.7-80.9 52.7-132.1 0-106-86-192-192-192S0 86 0 192c0 51.2 20 97.7 52.7 132.1 16.5 17.4 31.2 37.6 38.4 59.9l201.7 0zM288 432l-192 0 0 16c0 44.2 35.8 80 80 80l32 0c44.2 0 80-35.8 80-80l0-16zM184 112c-39.8 0-72 32.2-72 72 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-66.3 53.7-120 120-120 13.3 0 24 10.7 24 24s-10.7 24-24 24z" />
                </svg>
              }
              listSearch={listExp}
              showlist={(item, index) => {
                return (
                  <button
                    className="text-left bg-white px-5 py-2 duration-200 ease-in hover:bg-zinc-200"
                    key={index}
                    onClick={() => {}}
                  >
                    {item.name}
                  </button>
                );
              }}
            />
          </div>
          <HorizontalScroll
            className="w-4/5 flex gap-5 items-center"
            inputValue={searchValue.career}
            inputChange={(value) =>
              setSearchValue({ ...searchValue, career: value })
            }
            placeHolder="Nhập ngành nghề"
            iconShow={
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M256 0a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm96 312c0 25-12.7 47-32 59.9l0 92.1c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-92.1C172.7 359 160 337 160 312l0-40c0-53 43-96 96-96s96 43 96 96l0 40zM96 32a56 56 0 1 1 0 112 56 56 0 1 1 0-112zm16 240l0 32c0 32.5 12.1 62.1 32 84.7l0 75.3c0 1.2 0 2.5 .1 3.7-8.5 7.6-19.7 12.3-32.1 12.3l-32 0c-26.5 0-48-21.5-48-48l0-56.6C12.9 364.4 0 343.7 0 320l0-32c0-53 43-96 96-96 12.7 0 24.8 2.5 35.9 6.9-12.6 21.4-19.9 46.4-19.9 73.1zM368 464l0-75.3c19.9-22.5 32-52.2 32-84.7l0-32c0-26.7-7.3-51.6-19.9-73.1 11.1-4.5 23.2-6.9 35.9-6.9 53 0 96 43 96 96l0 32c0 23.7-12.9 44.4-32 55.4l0 56.6c0 26.5-21.5 48-48 48l-32 0c-12.3 0-23.6-4.6-32.1-12.3 0-1.2 .1-2.5 .1-3.7zM416 32a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
              </svg>
            }
            listSearch={listCareer}
            showlist={(item, index) => (
              <button
                key={index}
                className="shrink-0 bg-white rounded-2xl px-5 py-2 border-2 border-[#01215C] duration-200 ease-in hover:text-white hover:bg-[#01215C] hover:border-white"
                onClick={() => {
                  setSearchValue({ ...searchValue, career: item.name });
                }}
              >
                {item.name}
              </button>
            )}
          />
        </div>
      </div>
      <div className="w-full h-[800px] flex justify-center items-center ">
        <div className="w-4/5 h-full bg-zinc-200 rounded-2xl overflow-auto no-scroll shadow-basic">
          {listJob && listJob.length > 0 ? (
            <div className="w-full grid grid-cols-2 gap-2 p-2 items-start">
              {listJob.map((item, index) => (
                <div
                  key={index}
                  className="bg-white flex items-center p-3 gap-2 border-2 border-white rounded-2xl cursor-pointer shadow-basic duration-300 ease-in hover:border-[#01215C]"
                  onClick={() => {
                    dispatch(setWeb({ load: true }));
                    router.push(`/job_detail?id=${item.id}`);
                  }}
                >
                  <div className="relative w-[170px] h-[170px] border-2 border-zinc-200 flex justify-center items-center bg-zinc-200 rounded-2xl overflow-hidden">
                    {item.company.image === "noImage" ? (
                      <div className="w-full h-full">
                        <svg
                          className="w-full h-full fill-zinc-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path d="M288 48c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 48 48 0 0-72c0-13.3 10.7-24 24-24s24 10.7 24 24l0 72 16 0c26.5 0 48 21.5 48 48l0 320c0 26.5-21.5 48-48 48l-256 0c-26.5 0-48-21.5-48-48l0-416zm64 64l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM352 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM528 192c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM512 304l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zM96 480l0-160-16 0c-44.2 0-80-35.8-80-80 0-26.7 13.1-50.3 33.2-64.9-.8-4.9-1.2-10-1.2-15.1 0-53 43-96 96-96s96 43 96 96l0 96c0 35.3-28.7 64-64 64l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32z" />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        fill
                        alt={item.company.image}
                        src={`${process.env.NEXT_PUBLIC_SERVER_PORT}media/${item.company.image}`}
                        sizes="(max-width: 768px)"
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1 gap-1 flex flex-col min-w-0">
                    <div className="flex gap-2 items-center">
                      <p className="truncate font-bold" title={item.name}>
                        {item.sourceLink ? (
                          <Link
                            className="bg-[#009DFF] rounded-md text-white px-2 mr-2"
                            href={item.sourceLink}
                          >
                            {item.sourceName}
                          </Link>
                        ) : (
                          <span className="bg-[#009DFF] rounded-md text-white px-2 mr-2">
                            {item.sourceName}
                          </span>
                        )}
                        {item.name}
                      </p>
                    </div>
                    <p
                      className="w-full truncate text-zinc-400 duration-200 ease-in hover:text-zinc-500 hover:font-bold"
                      title={item.company.name}
                    >
                      {item.company.name}
                    </p>
                    <div className="flex items-center w-full gap-2">
                      <p className="shrink-0">
                        {getField(item.requires, ["lương"])}
                      </p>
                      {item.address && (
                        <>
                          <p className="font-bold">|</p>
                          <p className="font-bold">{item.address}</p>
                        </>
                      )}
                      {(() => {
                        const list = getListField(item.requires, "nghề");
                        return (
                          list &&
                          list.length > 0 && (
                            <>
                              <p className="font-bold">|</p>
                              <div className="flex flex-1 gap-2 items-center overflow-auto no-scroll">
                                {list.map((field, index) => (
                                  <button
                                    key={index}
                                    className="shrink-0 px-2 border-2 border-[#009DFF] rounded-lg duration-200 ease-in hover:text-[#009DFF]"
                                  >
                                    {field.requestText}
                                  </button>
                                ))}
                              </div>
                            </>
                          )
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full bg-white flex flex-col justify-center items-center rounded-2xl">
              <div className="w-[100px] h-[100px]">
                <svg
                  className="w-full h-full fill-zinc-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                >
                  <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
                </svg>
              </div>
              <p className="font-bold text-zinc-500">
                Không có tuyển dụng nào được đăng tải
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-3 p-2 bg-zinc-100 rounded-full">
          <button
            className={
              changePage.page === 1
                ? "w-[50px] h-[50px] bg-white rounded-full p-2 fill-zinc-500 border-2 border-zinc-500"
                : "w-[50px] h-[50px] bg-[#01215c] rounded-full p-2 fill-white border-2 border-[#01215c] duration-200 ease-in hover:bg-white hover:fill-[#01215c]"
            }
            disabled={changePage.page === 1}
            onClick={() => {
              searchJob(changePage.page - 1);
            }}
          >
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <button
            className={
              changePage.page >= changePage.totalPage
                ? "w-[50px] h-[50px] bg-white rounded-full p-2 fill-zinc-500 border-2 border-zinc-500"
                : "w-[50px] h-[50px] bg-[#01215c] rounded-full p-2 fill-white border-2 border-[#01215c] duration-200 ease-in hover:bg-white hover:fill-[#01215c]"
            }
            disabled={changePage.page >= changePage.totalPage}
            onClick={() => {
              searchJob(changePage.page + 1);
            }}
          >
            <svg
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path d="M247.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L179.2 256 41.9 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
