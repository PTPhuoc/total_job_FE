"use client";
import aboutImage1 from "@/app/assets/Image_About_1.jpg";
import aboutImage2 from "@/app/assets/Image_About_2.png";
import aboutImage3 from "@/app/assets/Image_About_3.png";
import aboutImage4 from "@/app/assets/Image_About_4.png";
import aboutImage5 from "@/app/assets/Image_About_5.jpg";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setWeb } from "@/app/store/slices/webSlice";

export default function page() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setWeb({load: false}))
    const items = document.querySelectorAll(
      ".put-right, .put-left, .put-up, .put-down"
    );

    const observer = new IntersectionObserver((entries) => {
      let lastClass = null;
      let counter = 0;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentClass = [
            "put-left",
            "put-right",
            "put-up",
            "put-down",
          ].find((cls) => entry.target.classList.contains(cls));
          if (currentClass === lastClass) {
            counter++;
          } else {
            lastClass = currentClass;
            counter = 1;
          }
          entry.target.style.setProperty("--delay", `${counter * 0.3}s`);
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    });

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-[100px] flex flex-col w-full h-full">
      <div className="w-full h-[700px] flex gap-[5%] px-[10%] my-14">
        <div className="w-[400px] h-full overflow-hidden rounded-2xl put-right">
          <Image
            src={aboutImage1}
            alt="aboutImage1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 justify-center">
          <p className="text-[#0048CE] text-[30px] put-left">
            Chào mừng bạn đến với{" "}
            <span className="text-[#00369A] font-bold">FUJobs</span>
          </p>
          <p className="text-[80px] text-[#0048CE] text-justify put-left">
            NƠI MÀ BẠN CÓ THỂ YÊN TÂM LỰA CHỌN CÁC CÔNG VIỆC BẠN MUỐN MỘT CÁCH
            AN TOÀN
          </p>
          <p className="text-[30px] text-[#5E5E5E] text-justify put-left">
            Và tại đây cũng là nơi tổng hợp lại các tuyển dụng từ các website uy
            tín mà chúng tôi tin tưởng lấy về cho bạn đa dạng lự chọn công việc
            mình mong muốn
          </p>
          <Link
            className="put-left self-start"
            href={"/"}
            onClick={() => {
              dispatch(setWeb({load: false}))
            }}
          >
            <div className="flex items-center gap-5 self-start px-[20px] py-[5px] rounded-2xl bg-[#01215C] border-2 border-[#01215C] text-white fill-white scale-100 duration-300 ease-in hover:text-[#01215C] hover:bg-white hover:fill-[#01215C] active:scale-95">
              <p className="text-[30px]">Tìm công việc mong muốn</p>
              <div className="w-[50px] h-[50px]">
                <svg
                  className="w-[50px] h-[50px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full h-[700px] flex flex-col bg-white pb-5">
        <div className="relative w-full h-[4px] bg-[#009DFF] my-12 put-up">
          <div className="absolute w-full flex justify-center items-center -translate-y-1/2">
            <p className="text-[#009DFF] text-[60px] bg-white px-5">
              CHÚNG TÔI CÓ GÌ
            </p>
          </div>
        </div>
        <div className="flex flex-1 justify-between px-[10%]">
          <div className="relative group h-full w-[400px] bg-gray-500 rounded-2xl overflow-hidden shadow-basic put-up">
            <Image
              className="w-full h-full object-cover scale-100 duration-300 ease-in-out group-hover:scale-110"
              src={aboutImage2}
              alt="aboutImage2"
            />
            <div className="absolute p-3 gap-3 top-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="flex items-center justify-start p-3 w-full h-[40%] bg-[rgba(224,224,224,0.7)] rounded-2xl translate-y-[85px] duration-300 ease-in-out group-hover:translate-y-0">
                <p className=" text-justify text-[30px]">
                  Có đầy đủ tính năng cơ bản để soạn thảo lý lịch cho bạn và các
                  bản mẫu đa dạng cho bạn xây dựng lý lịch cá nhân đẹp
                </p>
              </div>

              <div className="flex w-full justify-end">
                <div className="flex gap-3 items-center fill-white text-white rounded-2xl bg-[#01215C] border-2 border-[#01215C] scale-100 duration-300 ease-in-out translate-y-[85px] group-hover:translate-y-0 hover:text-[#01215C] hover:bg-white hover:fill-[#01215C] active:scale-95">
                  <Link href={"/signin"} className="flex p-3 text-[30px]">
                    Bắt đầu tạo CV
                  </Link>
                  <div className="w-[40px] h-[40px]">
                    <svg
                      className="w-[40px] h-[40px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group h-full w-[400px] bg-gray-500 rounded-2xl overflow-hidden shadow-basic put-up">
            <Image
              className="w-full h-full object-cover scale-100 duration-300 ease-in-out group-hover:scale-110"
              src={aboutImage3}
              alt="aboutImage3"
            />
            <div className="absolute p-3 gap-3 top-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="flex items-center justify-start p-3 w-full h-[40%] bg-[rgba(224,224,224,0.7)] rounded-2xl translate-y-[85px] duration-300 ease-in-out group-hover:translate-y-0">
                <p className=" text-justify text-[30px]">
                  Một bảng điều khiển đầy đủ chức năng cho các nhà tuyển dụng để
                  dể dàng quản lý các ứng viên
                </p>
              </div>

              <div className="flex w-full justify-end">
                <div className="flex gap-3 items-center fill-white text-white rounded-2xl bg-[#01215C] border-2 border-[#01215C] scale-100 duration-300 ease-in-out translate-y-[85px] group-hover:translate-y-0 hover:text-[#01215C] hover:bg-white hover:fill-[#01215C] active:scale-95">
                  <Link href={"/signin"} className="flex p-3 text-[30px]">
                    Bắt đầu quản lí
                  </Link>
                  <div className="w-[40px] h-[40px]">
                    <svg
                      className="w-[40px] h-[40px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group h-full w-[400px] bg-gray-500 rounded-2xl overflow-hidden shadow-basic put-up">
            <Image
              className="w-full h-full object-cover scale-100 duration-300 ease-in-out group-hover:scale-110"
              src={aboutImage4}
              alt="aboutImage4"
            />
            <div className="absolute p-3 gap-3 top-0 left-0 w-full h-full flex flex-col justify-end">
              <div className="flex items-center justify-start p-3 w-full h-[40%] bg-[rgba(224,224,224,0.7)] rounded-2xl translate-y-[85px] duration-300 ease-in-out group-hover:translate-y-0">
                <p className=" text-justify text-[30px]">
                  Hệ thống thực hiện kiểm tra các văn bản tuyển dụng để luôn cho
                  bạn một việc làm uy tính
                </p>
              </div>

              <div className="flex w-full justify-end">
                <div className="flex gap-3 items-center fill-white text-white rounded-2xl bg-[#01215C] border-2 border-[#01215C] scale-100 duration-300 ease-in-out translate-y-[85px] group-hover:translate-y-0 hover:text-[#01215C] hover:bg-white hover:fill-[#01215C] active:scale-95">
                  <Link
                    href={"/"}
                    onClick={() => {
                      dispatch(setWeb({load: false}))
                    }}
                    className="flex p-3 text-[30px]"
                  >
                    Bắt đầu kiểm tra
                  </Link>
                  <div className="w-[40px] h-[40px]">
                    <svg
                      className="w-[40px] h-[40px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[400px] z-[5] bg-[#009DFF] px-[10%]">
        <div className="w-full h-full flex gap-10 translate-y-1/12">
          <div className="flex flex-1">
            <div className="flex flex-col w-full">
              <div className="flex flex-1 justify-between">
                <div className="flex flex-1 flex-col justify-between items-center">
                  <p className="text-white text-[80px] put-down">+100</p>
                  <p className="text-white text-[80px] put-up">Công việc</p>
                </div>
                <div className="flex flex-1 flex-col justify-between items-center">
                  <p className="text-white text-[80px] put-down">+200</p>
                  <p className="text-white text-[80px] put-up">Vị trí</p>
                </div>
              </div>
              <div className="flex flex-1 justify-center items-end">
                <div className="w-full put-right">
                  <Link
                    className="flex gap-5 justify-center items-center w-full p-3 rounded-2xl border-2 border-white fill-[#009DFF] bg-white text-[#009DFF] scale-100 shadow-basic duration-200 ease-in hover:text-white hover:bg-[#009DFF] hover:fill-white active:scale-95"
                    href={"/"}
                    onClick={() => {
                      dispatch(setWeb({load: false}))
                    }}
                  >
                    <p className="text-[30px]">Mỗi tháng cho bạn lựa chọn</p>
                    <div className="w-[30px] h-[30px]">
                      <svg
                        className="w-[40px] h-[40px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM305 225c9.4-9.4 9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l31 31-102.1 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l102.1 0-31 31c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72z" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden rounded-2xl shadow-basic put-left">
            <Image
              src={aboutImage5}
              alt="aboutImage5"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="relative flex flex-col w-full h-[800px]">
        <div className="-z-1 flex-1 bg-[#DEF7FF]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="w-[80%] h-[70%] px-[10%] bg-[#009DFF] gap-10 rounded-2xl shadow-basic flex flex-col justify-center items-center">
            <p className="text-white text-[80px] put-down">
              Hãy để chúng tôi hỗ trợ bạn
            </p>
            <p className="text-white text-[40px] text-center put-down">
              Được cập nhật liên tục các công việc mới nhất và phù hợp với bạn
              từ các thông báo. hãy cho chúng tôi mail của bạn để chúng tôi có
              thể thông báo một cách nhanh chóng
            </p>
            <div className="flex gap-5">
              <input
                className="bg-white outline-none w-[500px] py-3 px-10 text-[40px] rounded-2xl put-right"
                placeholder="Email"
              />
              <div className="put-left">
                <button className="text-[40px] py-3 px-10 bg-[#01215C] text-white rounded-2xl border-2 border-[#01215C] duration-200 ease-in hover:bg-white hover:text-[#01215C]">
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
