"use client";

import React, { useEffect, useState } from "react";

export default function InputMonthAndYear({
  valueInput,
  give = false,
  handleChange,
  overYear = true,
}) {
  const currentDate = new Date();
  const [inputValue, setInputValue] = useState(() => {
    const [
      month = give ? currentDate.getMonth() + 1 : "",
      year = give ? currentDate.getFullYear() : "",
    ] = (valueInput || "").split(",");
    return {
      month: month,
      year: year,
    };
  });
  const [focusInput, setFocusInput] = useState({
    month: false,
    year: false,
  });
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    name: `Tháng ${i + 1}`,
  }));
  const year = overYear
    ? currentDate.getFullYear() + 25
    : currentDate.getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => ({
    value: year - i,
    name: `Năm ${year - i}`,
  }));

  const handleSearch = (value, list) => {
    let search = list;
    if (value) {
      search = list.filter((item) =>
        item.name.toLowerCase().includes(value.toString())
      );
    }
    return search;
  };

  const filteredMonth = handleSearch(inputValue.month, months);
  const filteredYear = handleSearch(inputValue.year, years);

  useEffect(() => {
    handleChange(`${inputValue.month},${inputValue.year}`);
  }, [inputValue]);

  return (
    <div className="relative self-start flex items-center gap-1 group">
      <input
        value={inputValue.month}
        onClick={() => setFocusInput({ month: true, year: false })}
        onBlur={() =>
          setInputValue({
            ...inputValue,
            month:
              inputValue.month > 12
                ? 12
                : inputValue.month < 0
                ? 1
                : inputValue.month,
          })
        }
        type="number"
        className="group py-1 w-10 text-center outline-none border-2 border-zinc-200 rounded-lg duration-200 ease-in focus:border-[#02325c]"
        onChange={(e) =>
          setInputValue({ ...inputValue, month: e.target.value })
        }
      />
      <p>/</p>
      <input
        type="number"
        value={inputValue.year}
        onClick={() => setFocusInput({ month: false, year: true })}
        onBlur={() => {
          setInputValue({ ...inputValue, year: inputValue.year > year ? year : inputValue.year < year - 50 ? year - 50 : inputValue.year });
        }}
        className="group py-1 w-20 text-center outline-none border-2 border-zinc-200 rounded-lg duration-200 ease-in focus:border-[#02325c]"
        onChange={(e) => setInputValue({ ...inputValue, year: e.target.value })}
      />
      <div
        className={
          focusInput.month || focusInput.year
            ? "absolute top-14 max-h-0 w-full flex flex-col gap-[1px] bg-zinc-100 overflow-auto rounded-lg no-scroll border-2 border-[#01215c] opacity-0 duration-200 ease-in group-hover:max-h-[200px] group-hover:opacity-100"
            : "max-h-0 opacity-0"
        }
      >
        {focusInput.month &&
          filteredMonth.map((item, index) => (
            <button
              key={index}
              className="bg-white py-1"
              onClick={() => {
                setInputValue({ ...inputValue, month: item.value });
                setFocusInput({ month: false, year: false });
              }}
            >
              {item.name}
            </button>
          ))}
        {focusInput.year &&
          filteredYear.map((item, index) => (
            <button
              key={index}
              className="bg-white py-1"
              onMouseDown={() => {
                setInputValue({ ...inputValue, year: item.value });
                setFocusInput({ month: false, year: false });
              }}
            >
              {item.name}
            </button>
          ))}
      </div>
    </div>
  );
}
