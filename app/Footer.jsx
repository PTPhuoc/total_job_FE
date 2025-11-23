import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full h-[200px] text-[30px] text-white flex flex-col gap-2 justify-center items-center bg-[#6D7E9D]">
        <p className="font-bold">© FUJobs</p>
        <div className="flex items-center gap-5">
          <p>Theo dõi tại:</p>
          <a href="facebook.com" target="_blank" className="w-[30px] h-[30px]">
            <svg
              className="w-[30px] h-[30px] fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z" />
            </svg>
          </a>
          <a href="x.com" target="_blank" className="w-[30px] h-[30px]">
            <svg
              className="w-[30px] h-[30px] fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm297.1 84l-103.8 118.6 122.1 161.4-95.6 0-74.8-97.9-85.7 97.9-47.5 0 111-126.9-117.1-153.1 98 0 67.7 89.5 78.2-89.5 47.5 0zM323.3 367.6l-169.9-224.7-28.3 0 171.8 224.7 26.4 0z" />
            </svg>
          </a>
        </div>
        <p className="pt-3 border-t-2 border-white">
          Thiết kế bởi tanphuocphan370@gmail.com
        </p>
      </footer>
  )
}
