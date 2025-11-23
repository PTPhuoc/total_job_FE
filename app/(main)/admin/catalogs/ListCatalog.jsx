"use client";

import InputListSearch from "@/app/component/InputListSearch";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { listTypeCatalog, valueCatalog } from "../getData";
import { useDispatch, useSelector } from "react-redux";
import {
  setWindowWarning,
  setDefaultWindowWarning,
} from "@/app/store/slices/windowSlice";

export default function ListCatalog({ listCatalogs }) {
  const windowWarning = useSelector((state) => state.windowWarning);
  const dispatch = useDispatch();
  const [Catalogs, setCatalogs] = useState(listCatalogs);
  const [inputValue, setInputValue] = useState(valueCatalog);
  const [option, setOption] = useState({
    subcatalog: false,
  });

  const getCatalogs = () => {
    axios
      .get(process.env.NEXT_PUBLIC_SERVER_PORT + "api/catalog/get/")
      .then((rs) => {
        if (rs.data.status === "Success") {
          setCatalogs(rs.data.catalogs);
        } else {
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCatalog = () => {
    axios
      .post(process.env.NEXT_PUBLIC_SERVER_PORT + "api/catalog/add/", {
        ...inputValue,
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue(valueCatalog);
          getCatalogs();
        } else {
          dispatch(
            setWindowWarning({
              for: "Error Request",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeCatalog = () => {
    axios
      .post(process.env.NEXT_PUBLIC_SERVER_PORT + "api/catalog/change/", {
        ...inputValue,
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue(valueCatalog);
          getCatalogs();
        } else {
          dispatch(
            setWindowWarning({
              for: "Error Request",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCatalog = (id) => {
    axios
      .delete(process.env.NEXT_PUBLIC_SERVER_PORT + "api/catalog/delete/", {
        params: { id: id },
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue(valueCatalog);
          option.subcatalog && setOption({...option, subcatalog: false})
          getCatalogs();
        } else {
          dispatch(
            setWindowWarning({
              for: "Error Request",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addSubcatalog = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/subcatalog/add/`, {
        ...inputValue,
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue(valueCatalog);
          getCatalogs();
          setOption({ ...option, subcatalog: false });
        } else {
          dispatch(
            setWindowWarning({
              for: "Error Request",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeSubcatalog = () => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/subcatalog/change/`, {
        ...inputValue,
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setOption({ ...option, subcatalog: false });
          setInputValue(valueCatalog);
          getCatalogs();
        } else {
          dispatch(
            setWindowWarning({
              for: "Error Request",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteSubcatalog = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/subcatalog/delete/`, {
        params: { subId: id },
      })
      .then((rs) => {
        if (rs.data.status === "Success") {
          setInputValue(valueCatalog);
          setOption({...option, subcatalog: false})
          getCatalogs();
        } else {
          dispatch(
            setWindowWarning({
              for: "Error Request",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
          console.log(rs.data.message ? rs.data.message : rs.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (windowWarning.handle === "accept") {
      if (windowWarning.for === "DeleteCatalog") {
        deleteCatalog(windowWarning.value);
      } else if (windowWarning.for === "DeleteSubcatalog") {
        deleteSubcatalog(windowWarning.value);
      }
      setDefaultWindowWarning();
    }
  }, [windowWarning]);

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="w-full h-[100px] flex justify-between items-center p-5 bg-white">
        <p className="flex-1 font-bold">Danh sách danh mục</p>
        <div className="flex flex-2 items-center gap-5">
          {option.subcatalog ? (
            <>
              <input
                className="outline-none flex-2 px-5 py-3 border-2 border-zinc-400 text-zinc-400 rounded-2xl"
                type="text"
                value={inputValue.name}
                disabled={option.subcatalog}
              />
              <input
                name="subName"
                type="text"
                className="outline-none flex-2 px-5 py-3 border-2 border-[#01215C] rounded-2xl"
                placeholder="Tên danh mục phụ"
                value={inputValue.subName || ""}
                onChange={(e) => {
                  setInputValue({
                    ...inputValue,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </>
          ) : (
            <>
              <input
                className="outline-none flex-2 px-5 py-3 border-2 border-[#01215C] rounded-2xl"
                type="text"
                name="name"
                value={inputValue.name}
                onChange={(e) =>
                  setInputValue({
                    ...inputValue,
                    [e.target.name]: e.target.value,
                  })
                }
                placeholder="Tên danh mục"
              />
              <InputListSearch
                className="w-full flex-2 px-5 py-3 border-2 border-[#01215C] rounded-2xl"
                placeHolder="Loại danh mục"
                listSearch={listTypeCatalog}
                inputValue={inputValue.type}
                inputChange={(value) =>
                  setInputValue({ ...inputValue, type: value })
                }
                showlist={(item, index) => {
                  return (
                    <button
                      className="text-left bg-white px-5 py-2 duration-200 ease-in hover:bg-zinc-200"
                      key={index}
                      onClick={() => {
                        setInputValue({ ...inputValue, type: item.name });
                      }}
                    >
                      {item.name}
                    </button>
                  );
                }}
              />
            </>
          )}

          {inputValue.id ? (
            <div className="flex-1 flex gap-3 items-center">
              <button
                className={
                  (
                    option.subcatalog
                      ? inputValue.subName
                      : inputValue.name && inputValue.type
                  )
                    ? "flex-1 px-5 py-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-300 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                    : "flex-1 px-5 py-3 bg-zinc-500 text-white border-2 border-zinc-500 rounded-2xl"
                }
                onClick={() => {
                  if (option.subcatalog) {
                    if (inputValue.subId) {
                      changeSubcatalog();
                    } else {
                      addSubcatalog();
                    }
                  } else {
                    changeCatalog();
                  }
                }}
                disabled={
                  (option.subcatalog
                    ? !inputValue.subName
                    : !(inputValue.name && inputValue.type))
                }
              >
                {option.subcatalog && !inputValue.subId ? "Thêm" : "Sửa"}
              </button>
              <button
                onClick={() => {
                  setInputValue({ ...valueCatalog });
                  if (option.subcatalog)
                    setOption({ ...option, subcatalog: false });
                }}
                className="flex-1 px-5 py-3 bg-[#CC2929] text-white border-2 border-[#CC2929] rounded-2xl scale-100 duration-300 ease-in hover:bg-white hover:text-[#CC2929] active:scale-95"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              className={
                inputValue.name && inputValue.type
                  ? "flex-1 px-5 py-3 bg-[#01215C] text-white border-2 border-[#01215C] rounded-2xl scale-100 duration-300 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
                  : "flex-1 px-5 py-3 bg-zinc-500 text-white border-2 border-zinc-500 rounded-2xl"
              }
              onClick={() => {
                addCatalog();
              }}
              disabled={!(inputValue.name && inputValue.type)}
            >
              Thêm
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full items-center bg-white">
        <p className="flex-2 py-3 px-5 text-center font-bold">Tên</p>
        <p className="flex-2 py-3 px-5 text-center font-bold border-x-2 border-[#01215C]">
          Loại
        </p>
        <p className="flex-1 py-3 px-5 text-center font-bold">Tùy chọn</p>
      </div>
      {Catalogs && Catalogs.length > 0 ? (
        <div className="flex flex-col flex-1 overflow-auto no-scroll gap-1">
          {Catalogs.map((item, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => {
                  setInputValue({
                    id: item.id,
                    name: item.name,
                    type: item.type,
                  });
                }}
                className={
                  inputValue.id === item.id
                    ? "flex w-full items-center bg-white border-l-8 border-[#009DFF] duration-200 ease-out"
                    : "flex w-full items-center bg-white border-l-0 border-[#009DFF] duration-200 ease-out hover:border-l-8"
                }
              >
                <p className="flex-2 py-3 px-5">{item.name}</p>
                <p className="flex-2 py-3 px-5 border-x-2 border-[#01215C]">
                  {item.type}
                </p>
                <div className="flex flex-1 gap-2 py-1 px-5 justify-center items-center">
                  <button
                    className="py-2 px-3 bg-[#01215C] border-2 border-[#01215C] text-white font-bold rounded-2xl duration-200 ease-in hover:bg-white hover:text-[#01215C]"
                    onClick={() => {
                      setOption({ ...option, subcatalog: true });
                      setInputValue({
                        ...valueCatalog,
                        id: item.id,
                        name: item.name,
                      });
                    }}
                  >
                    Thêm mục phụ
                  </button>
                  <button
                    className="py-2 px-5 bg-[#CC2929] border-2 border-[#CC2929] text-white font-bold rounded-2xl duration-200 ease-in hover:bg-white hover:text-[#CC2929]"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        setWindowWarning({
                          for: "DeleteCatalog",
                          title: "Xóa Danh Mục",
                          content: "Bạn có chắc muốn xóa " + item.name,
                          handle: "pending",
                          type: "YorN",
                          isOpen: true,
                          value: item.id,
                        })
                      );
                    }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
              {item.subcatalogs &&
                item.subcatalogs.map((sub, subIndex) => (
                  <div
                    key={subIndex}
                    className={
                      inputValue.subId === sub.id
                        ? "flex w-full items-center bg-white border-l-8 border-[#009DFF] duration-200 ease-out"
                        : "flex w-full items-center bg-white border-l-0 border-[#009DFF] duration-200 ease-out hover:border-l-8"
                    }
                    onClick={() => {
                      setOption({ ...option, subcatalog: true });
                      setInputValue({
                        ...valueCatalog,
                        id: item.id,
                        subId: sub.id,
                        subName: sub.name,
                        name: item.name,
                      });
                    }}
                  >
                    <p className="flex-4 py-3 px-10 border-r-2 border-[#01215C]">
                      {sub.name}
                    </p>
                    <div className="flex flex-1 gap-2 py-1 px-5 justify-center items-center">
                      <button
                        className="py-2 px-5 bg-[#CC2929] border-2 border-[#CC2929] text-white font-bold rounded-2xl duration-200 ease-in hover:bg-white hover:text-[#CC2929]"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(
                            setWindowWarning({
                              for: "DeleteSubcatalog",
                              title: "Xóa Danh Mục",
                              content: "Bạn có chắc muốn xóa " + sub.name,
                              handle: "pending",
                              type: "YorN",
                              isOpen: true,
                              value: sub.id,
                            })
                          );
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-[100px] h-[100px] fill-[#6D7E9D]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
              </svg>
            </div>
            <p className="font-bold text-[#6D7E9D]">Không có dữ liệu</p>
          </div>
        </div>
      )}
    </div>
  );
}
