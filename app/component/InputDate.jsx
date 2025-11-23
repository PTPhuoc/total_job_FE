"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function InputDate({
  inputValue,
  handleChange,
  isGiven = true,
  designInput = "border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState(() => {
    const currentDate = new Date();
    if (inputValue) {
      const [year, month, day] = inputValue.split("-");
      const dateValue = new Date(year, month - 1, day);
      return {
        date: dateValue.getDate(),
        month: dateValue.getMonth() + 1,
        year: dateValue.getFullYear(),
      };
    }
    if (isGiven) {
      return {
        date: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      };
    } else {
      return { date: "", month: "", year: "" };
    }
  });

  const matchingDay = () => {
    const currentDate = new Date();
    const match = new Date(
      day.year || currentDate.getFullYear(),
      day.month ? day.month - 1 : currentDate.getMonth(),
      day.date || currentDate.getDate()
    );
    setDay({
      date: match.getDate(),
      month: match.getMonth() + 1,
      year: match.getFullYear(),
    });
  };

  useEffect(() => {
    const converDay = new Date(day.year, day.month - 1, day.date)
    handleChange(format(converDay, "yyyy-MM-dd"));
  }, [day]);

  return (
    <div className="relative flex items-center gap-3">
      <div className="flex items-center gap-1">
        <input
          className={`outline-none w-10 text-center ${designInput}`}
          type="number"
          name="date"
          value={day.date}
          onChange={(e) => {
            let date = parseInt(e.target.value);
            if (isNaN(date)) date = "";
            else if (date > 32) date = 32;
            else if (date < 1) date = 1;
            setDay({
              ...day,
              [e.target.name]: date,
            });
          }}
          onBlur={() => matchingDay()}
        />
        <p>/</p>
        <input
          className={`outline-none w-10 text-center ${designInput}`}
          type="number"
          name="month"
          value={day.month}
          onChange={(e) => {
            let month = parseInt(e.target.value);
            if (isNaN(month)) month = "";
            else if (month > 12) month = 12;
            else if (month < 1) month = 1;
            setDay({
              ...day,
              [e.target.name]: month,
            });
          }}
          onBlur={() => matchingDay()}
        />
        <p>/</p>
        <input
          className={`outline-none w-20 text-center ${designInput}`}
          type="number"
          name="year"
          value={day.year}
          onChange={(e) => {
            const currentDate = new Date();
            let year = parseInt(e.target.value);
            if (isNaN(year)) year = "";
            else if (year > currentDate.getFullYear() || year < 1)
              year = currentDate.getFullYear();
            setDay({
              ...day,
              [e.target.name]: year,
            });
          }}
          onBlur={() => matchingDay()}
        />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[30px] h-[30px] bg-white fill-[#009DFF] stroke-0 stroke-[#009DFF] duration-200 ease-in hover:fill-white hover:stroke-[25]"
      >
        <svg
          className="w-full h-full "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 32 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l32 0 0-32c0-17.7 14.3-32 32-32zM64 240l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 368l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
        </svg>
      </button>
      <div className="absolute left-[120px]">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            const dateSelect = new Date(date);
            setDay({
              date: dateSelect.getDate(),
              month: dateSelect.getMonth() + 1,
              year: dateSelect.getFullYear(),
            });
            setIsOpen(false);
          }}
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}
          className="h-0 w-0"
        />
      </div>
    </div>
  );
}
