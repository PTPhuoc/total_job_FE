"use client";

import React, { useEffect, useState } from "react";

export default function InputList({
  typeInput = "text",
  valueInput,
  listSelect,
  placeholder,
  handleClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    let listSearch = listSelect;
    if (value) {
      listSearch = listSelect.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
    }
    return listSearch;
  };

  useEffect(() => {
    if (valueInput) {
      setSearchValue(valueInput);
    }
  }, [valueInput]);

  return (
    <div className="relative ">
      <input
        type={typeInput}
        className="relative bg-white outline-none py-4 w-[300px] rounded-2xl pl-5 z-[2] shadow"
        onClick={() => setIsOpen(true)}
        onBlur={(e) => {
          setIsOpen(false);
          handleClick(e.target.value);
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
      />
      <div
        className={
          "z-[1] top-0 absolute w-full overflow-auto mt-[20px] pt-[20px] bg-white border-2 border-[#bce4ff] no-scroll rounded-2xl duration-200 ease-out " +
          (isOpen ? "max-h-[300px]" : "max-h-0")
        }
      >
        {listSelect && listSelect.length > 0 ? (
          <div className="w-full flex flex-col gap-1 p-1 pt-8 rounded-2xl shadow">
            {handleSearch(searchValue).map((item, index) => (
              <button
                key={index}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleClick(item);
                  setSearchValue(item);
                }}
                className="w-full text-[#01215C] p-2 bg-[#bce4ff] border-2 border-[#bce4ff] rounded-md scale-100 duration-200 ease-in hover:bg-[#01215C] hover:text-[#bce4ff] active:scale-95"
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1 p-1 pt-8 rounded-2xl shadow">
            <p className="p-2 text-center">Danh sách trống</p>
          </div>
        )}
      </div>
    </div>
  );
}
