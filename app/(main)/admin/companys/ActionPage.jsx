"use client";

import ButtonDefault from "@/app/component/ButtonDefault";
import { setWeb } from "@/app/store/slices/webSlice";
import { setDefaultWindowWarning, setWindowWarning } from "@/app/store/slices/windowSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ActionPage({ listCompany }) {
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();
  const route = useRouter()
  const [company, setCompany] = useState(listCompany.listCompany);
  const [changePage, setChangePage] = useState({
    page: listCompany.page,
    total: listCompany.total,
    pageSize: listCompany.limit,
    totalPage: listCompany.totalPages,
  });
  const [searchValue, setSearchValue] = useState({ name: "" });

  const searchCompany = async (page) => {
    return axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/company/search/`, {
        params: {
          searchValue: JSON.stringify({
            ...searchValue,
          }),
          page: page,
        },
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setCompany(rs.data.listCompany);
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

  const deleteCompany = async (id) => {
     return axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/admin/delete_company/`,
        { params: { id: id }, withCredentials: true }
      )
      .then(async (rs) => {
        if (rs.data.status === "Success") {
          await searchCompany();
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
  }

  useEffect(() => {
    dispatch(setWeb({ load: false }));
  }, []);

  useEffect(() => {
      const handleWindow = async () => {
        if (windowWarning.handle === "accept") {
          if (windowWarning.for === "DeleteCompanyByAdmin") {
            await deleteCompany(windowWarning.value);
          }
          dispatch(setDefaultWindowWarning());
        }
      };
      handleWindow();
    }, [windowWarning]);

  return (
    <div className="flex min-w-0 flex-col gap-1 w-full h-full">
      <div className="flex gap-5 items-center h-[100px] px-5 bg-white">
        <input
          type="text"
          className="flex-1 px-5 py-1 outline-none border-2 border-zinc-100 rounded-lg duration-200 ease-in hover:border-[#01215C]"
          placeholder="Tên công ty"
          onChange={(e) =>
            setSearchValue({ ...searchValue, name: e.target.value })
          }
        />
        <ButtonDefault
          classNameButton="px-5 py-1 rounded-lg bg-[#01215c] text-white border-2 border-[#01215c] duration-200 ease-in hover:bg-white hover:text-[#01215c]"
          classNameWait="px-5 py-1 rounded-lg bg-[#01215c] border-2 border-[#01215c]"
          textButton={"Tìm kiếm"}
          handleApi={() => {
            return searchCompany(changePage.page);
          }}
        ></ButtonDefault>
      </div>
      {company && company.length > 0 ? (
        <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-auto no-scroll ">
          {company.map((item, index) => (
            <div
              key={index}
              className="flex min-w-0 items-center p-5 gap-5 bg-white border-0 border-[#009DFF] cursor-pointer duration-200 ease-in hover:border-l-8"
              onClick={() => {
                dispatch(setWeb({ load: true }));
                route.push(`/company_detail?id=${item.id}`);
              }}
            >
              <div className="flex flex-1 min-w-0 flex-col gap-2">
                <p className="truncate font-bold" title={item.name}>
                  
                  {item.name}
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  className="px-5 py-1 bg-red-500 border-2 border-red-500 rounded-lg text-white duration-200 ease-in hover:bg-white hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(
                      setWindowWarning({
                        for: "DeleteCompanyByAdmin",
                        title: "Xóa tuyển dụng",
                        content: `Bạn có chắc muốn xóa tuyển dụng ${item.name}`,
                        handle: "pending",
                        type: "YorN",
                        isOpen: true,
                        value: item.id,
                      })
                    );
                  }}
                >
                  Xóa công ty
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 bg-white flex flex-col justify-center items-center">
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
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-3 p-2 bg-white rounded-full">
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
