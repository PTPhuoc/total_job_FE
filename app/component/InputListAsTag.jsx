"use client";

import React, { useEffect, useState } from "react";

export default function InputListAsTag({
  listSearch,
  availableList,
  handleChange,
  searchAttribute = "name",
  designInput = "border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]",
  placeholder = "Nhập",
}) {
  const [valueSearch, setValueSearch] = useState("");
  const [listTag, setListTag] = useState(availableList);

  const handleSearch = (list) => {
    let search = list;
    if (valueSearch) {
      search = search.filter((item) =>
        item[searchAttribute]
          ? typeof item[searchAttribute] === "string"
            ? item[searchAttribute]
                .toLowerCase()
                .includes(valueSearch.toLowerCase())
            : item[searchAttribute] === valueSearch
          : typeof item === "string"
          ? item.toLowerCase().includes(valueSearch.toLowerCase())
          : item === valueSearch
      );
    }
    return search;
  };

  const filteredList = handleSearch(listSearch);

  useEffect(() => {
    handleChange(listTag)
  }, [listTag])

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="relative group w-full">
        <input
          type="text"
          name="search"
          className={`outline-none w-full ${designInput}`}
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value)}
          placeholder={placeholder}
        />
        <div className="absolute overflow-auto no-scroll flex flex-col justify-start gap-[1px] left-0 top-full mt-1 w-full max-h-0 bg-zinc-200 border-2 border-[#01215C] rounded-2xl opacity-0 transition-all duration-200 ease-in-out group-hover:max-h-[200px] group-hover:opacity-100">
          {listSearch && listSearch.length > 0 && filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <div
                key={index}
                className="text-left bg-white px-5 py-2 cursor-pointer duration-200 ease-in hover:bg-zinc-200"
                onClick={() => {
                  if (!listTag.includes(item.name))
                    setListTag((prev) => [...prev, item.name]);
                  setValueSearch("");
                }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center text-center">
              <p className="p-3 bg-white rounded-2xl w-full">Danh sách trống</p>
            </div>
          )}
        </div>
      </div>
      {listTag && listTag.length > 0 && (
        <div className="flex flex-col gap-3">
          {listTag.map((item, index) => (
            <div
              key={index}
              className="text-left flex items-center justify-between px-3 py-1 rounded-lg border-2 border-zinc-200"
            >
              <p>{item}</p>
              <button
                className="w-[30px] h-[30px] fill-[#009DFF] stroke-[#009DFF] stroke-0 cursor-pointer duration-200 ease-in hover:stroke-[25] hover:fill-white"
                onClick={() => {
                  setListTag(
                    listTag.filter(
                      (tag) => tag.toLowerCase() !== item.toLowerCase()
                    )
                  );
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
