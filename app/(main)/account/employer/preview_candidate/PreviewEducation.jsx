
export default function PreviewEducation({ valueInput, isOpen }) {
  const [start = "", end = ""] = (valueInput.course || "").split("-");
  const [startMonth = "", startYear = ""] = start.split(",");
  const [endMonth = "", endYear = ""] = end.split(",");

  return (
    <div className="absolute z-9 min-w-0 w-full h-full py-5 top-0 left-0 flex justify-center items-center bg-[rgba(255,255,255,0.5)]">
      <div className="w-4/5 min-w-0 h-full flex flex-col rounded-2xl shadow-basic bg-white overflow-hidden">
        <p className="bg-[#009DFF] text-white font-bold p-5">Học vấn</p>
        <div className="flex-1 flex flex-col min-w-0 p-5 gap-5 overflow-auto no-scroll">
          <div className="flex flex-col min-w-0 p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Tên trường</p>
            <p className="truncate border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]">
              {valueInput.name ?? "Không có"}
            </p>
          </div>
          <div className="flex flex-col min-w-0 p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Khóa học</p>
            <p className="truncate border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]">{`${
              startMonth && startMonth + "/"
            }${startYear} - ${endMonth && endMonth + "/"}${endYear}`}</p>
          </div>
          <div className="flex flex-col min-w-0 p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Bằng cấp</p>
            <p className="truncate border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]">
              {valueInput.degree ?? "Không có"}
            </p>
          </div>
          <div className="flex flex-col min-w-0 p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Kỹ năng</p>
            <p className="truncate border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]">
              {valueInput.industry ?? "Không có"}
            </p>
          </div>
          <div className="flex flex-col min-w-0 p-5 border-2 border-zinc-200 rounded-xl">
            <p className="px-5">Mô tả</p>
            <p className="max-h-[300px] min-h-[100px] border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]">
              {valueInput.decryption ?? "Không có"}
            </p>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-end p-5">
            <button
              onClick={() => isOpen(false)}
              className="px-5 py-1 bg-[#01215c] text-white rounded-lg border-2 border-[#01215c] scale-100 duration-200 ease-in hover:bg-white hover:text-[#01215c] active:scale-95"
            >
              Đóng
            </button>
        </div>
      </div>
    </div>
  );
}
