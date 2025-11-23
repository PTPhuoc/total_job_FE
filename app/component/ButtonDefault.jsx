"use client";

import React, { useState } from "react";

export default function ButtonDefault({
  classNameButton = "px-5 bg-[#01215C] text-white border-2 border-[#01215C] rounded-lg scale-100 duration-300 ease-in hover:bg-white hover:text-[#01215C] active:scale-95",
  classNameWait = "px-5 bg-white border-2 border-[#01215C] rounded-lg",
  handleApi,
  textButton,
  disable = false,
}) {
  const [isPending, setIsPending] = useState(false);
  const run = async () => {
    if (isPending) return;

    setIsPending(true);
    try {
      await handleApi();
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      {isPending ? (
        <div
          className={`relative ${classNameWait} duration-300 ease-in-out cursor-default`}
        >
          <p className="opacity-0">{textButton}</p>
          <div className="jimu-primary-loading"></div>
        </div>
      ) : (
        <button
          disabled={disable}
          className={classNameButton}
          onClick={(e) => {
            e.stopPropagation();
            run();
          }}
        >
          {textButton}
        </button>
      )}
    </>
  );
}
