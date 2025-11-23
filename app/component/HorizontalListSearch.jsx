"use client";

import { useEffect, useRef } from "react";

export default function HorizontalScroll({
  className = "w-full h-[80px]",
  typeInput = "text",
  inputValue,
  inputName,
  listSearch = [],
  inputChange,
  showlist,
  searchAttribute = "name",
  placeHolder = "Nhập",
  iconShow = null,
}) {
  const horizontalScroll = useRef(null);
  const handleSearch = (list) => {
    let search = list;
    if (inputValue) {
      search = search.filter((item) =>
        item[searchAttribute]
          ? typeof item[searchAttribute] === "string"
            ? item[searchAttribute]
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            : item[searchAttribute] === inputValue
          : typeof item === "string"
          ? item.toLowerCase().includes(inputValue.toLowerCase())
          : item === inputValue
      );
    }
    return search;
  };

  const filteredList = handleSearch(listSearch);

  useEffect(() => {
    const container = horizontalScroll.current;
    if (!container) return;

    const handleWheel = (e) => {
      const isScrollable = container.scrollWidth > container.clientWidth;
      if (isScrollable && container.matches(":hover")) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className={className}>
      <div className="flex-1 flex bg-white p-3 rounded-2xl items-center">
        {iconShow && (
          <div className="w-[30px] h-[30px] fill-[#01215C]">{iconShow}</div>
        )}
        <input
          className={"w-full outline-none " + (iconShow && "px-2")}
          type={typeInput}
          name={inputName}
          value={inputValue}
          placeholder={placeHolder}
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
      <div
        ref={horizontalScroll}
        className="flex-4 flex items-center gap-5 overflow-auto no-scroll"
      >
        {listSearch.length > 0 && filteredList.length > 0 ? (
          filteredList.map((item, index) => showlist(item, index))
        ) : (
          <div className="shrink-0">
            <p className="px-5 py-3 bg-white rounded-2xl text-zinc-500 font-bold">Danh sách trống</p>
          </div>
        )}
      </div>
    </div>
  );
}
