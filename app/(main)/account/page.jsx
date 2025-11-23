"use client";

import { decodeToken } from "@/app/store/slices/userSlice";
import { setWeb } from "@/app/store/slices/webSlice";
import { setWindowWarning } from "@/app/store/slices/windowSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const route = useRouter();

  const changeRole = (role) => {
    axios
      .patch(`${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/change_role/`, {
        role: role,
      }, {withCredentials: true})
      .then((rs) => {
        if (rs.data.status === "Success") {
          dispatch(setWeb({ load: true }));
        } else {
          dispatch(
            setWindowWarning({
              for: "ServerError",
              title: "Phản hồi từ Server",
              content: rs.data.message ? rs.data.message : rs.data.error,
              handle: "pending",
              type: "N",
              isOpen: true,
              value: "",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(decodeToken());
      });
  };

  useEffect(() => {
    if (user.role === "Pending") {
      dispatch(setWeb({ load: false }));
    } else {
      if (user.role === "Candidate") route.push(`/account/candidate`);
      if (user.role === "Employer") route.push(`/account/employer`);
      if (user.role === "Admin") route.push("/admin")
    }
  }, [user.role]);

  return (
    <div className="pt-[100px] w-full h-[800px] flex justify-center items-center bg-zinc-200">
      <div className="w-[30%] h-4/5 flex flex-col p-5 items-stretch justify-center bg-white rounded-2xl shadow-basic">
        <div className="flex-1 flex justify-center items-center ">
          <p className="text-[40px] text-center">
            Chào <span className="font-bold">{user.email}</span> Hãy cho chúng
            tôi biết bạn muốn trở thành ai?
          </p>
        </div>
        <div className="flex-2 flex flex-col gap-5 justify-center items-center">
          <button
            className="w-full bg-[#01215C] py-2 text-white rounded-lg border-2 border-[#01215C] cursor-pointer scale-100 duration-200 ease-in hover:text-[#01215C] hover:bg-white active:scale-95"
            onClick={() => changeRole("Candidate")}
          >
            Cộng tác viên
          </button>
          <button
            className="w-full bg-[#01215C] py-2 text-white rounded-lg border-2 border-[#01215C] cursor-pointer scale-100 duration-200 ease-in hover:text-[#01215C] hover:bg-white active:scale-95"
            onClick={() => changeRole("Employer")}
          >
            Nhà tuyển dụng
          </button>
        </div>
      </div>
    </div>
  );
}
