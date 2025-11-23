"use client";

import React, { useEffect, useRef, useState } from "react";

export default function InputCode({
  numberInput,
  inputChange,
  disable = false,
}) {
  const [valueInput, setValueInput] = useState(Array(numberInput).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    if(value && index < valueInput.length - 1){
      inputRefs.current[index + 1].focus()
    }
    
    const newArr = [...valueInput];
    newArr[index] = value;
    setValueInput(newArr);
  }

  useEffect(() => {
    const result = valueInput.reduce((acc, cur) => (acc += cur.toString()), "");
    inputChange(parseInt(result));
  }, [valueInput]);

  return (
    <div className="flex gap-3">
      {valueInput.map((item, index) => (
        <input
          disabled={disable}
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          className={
            disable
              ? "w-[50px] p-2 text-zinc-400 text-center outline-none rounded-xl border-2 border-zinc-400"
              : "w-[50px] p-2 text-center outline-none rounded-xl border-2 border-[#01215C]"
          }
          value={item}
          onChange={(e) => handleChange(e.target.value, index)}
        />
      ))}
    </div>
  );
}
