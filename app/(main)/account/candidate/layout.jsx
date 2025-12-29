import React from "react";
import MenuBar from "./MenuBar";

export default function CandidateLayout({ children }) {
  return (
    <div className="flex min-w-0 pt-[100px] w-full h-[920px] max-h-[1080px]">
      <div className="flex-2 p-5 flex flex-col bg-[#009DFF] justify-between">
        <MenuBar/>
      </div>
      <div className="relative flex-8 flex gap-5 p-5 min-w-0">{children}</div>
    </div>
  );
}
