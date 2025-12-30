"use client";

import { logout } from "@/app/store/slices/userSlice";
import { setWeb } from "@/app/store/slices/webSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWindowWarning } from "@/app/store/slices/windowSlice";

export default function AdminLayout({ children }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    if (!user.role || user.role !== "Admin") {
      route.push("/");
    } else {
      dispatch(setWeb({ load: false }));
    }
  }, []);

  return (
    <div className="w-full h-screen pt-[100px] flex min-w-0">
      <div className="flex-2 flex flex-col items-center gap-1 bg-zinc-300">
        <div className="w-full h-[100px] flex justify-center items-center bg-white font-bold">
          <p>Admin Mode</p>
        </div>
        <Link
          href={"/admin/jobs"}
          className="w-full p-5 bg-[#01215C] text-white border-y-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
        >
          Danh sách việc làm
        </Link>
        <Link
          href={"/admin/companys"}
          className="w-full p-5 bg-[#01215C] text-white border-y-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
        >
          Danh sách công ty
        </Link>
        <Link
          href={"/admin/users"}
          className="w-full p-5 bg-[#01215C] text-white border-y-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
        >
          Danh sách người dùng
        </Link>
        <Link
          href={"/admin/catalogs"}
          className="w-full p-5 bg-[#01215C] text-white border-y-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
        >
          Danh sách danh mục
        </Link>
        <Link
          href={"/admin/options"}
          className="w-full p-5 bg-[#01215C] text-white border-y-2 border-[#01215C] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215C] active:scale-95"
        >
          Lấy dữ liệu
        </Link>
        <button
          href={"/signin"}
          className="w-full p-5 text-left bg-red-500 text-white border-y-2 border-red-500 scale-100 duration-200 ease-in hover:bg-white hover:text-red-500 active:scale-95"
          onClick={() => {
            dispatch(
              setWindowWarning({
                for: "LogOut",
                title: "Đăng xuất",
                content: "Bạn có chắc muốn đăng xuất",
                handle: "pending",
                type: "YorN",
                isOpen: true,
                value: "",
              })
            );
          }}
        >
          Đăng xuất
        </button>
      </div>
      <div className="w-1 h-full bg-[#01215C]"></div>
      <div className="flex-8 min-w-0 bg-zinc-100">{children}</div>
    </div>
  );
}
