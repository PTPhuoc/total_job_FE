"use client";

export default function InputListSearch({
  className = "w-full h-[80px]",
  typeInput = "text",
  inputValue,
  inputName,
  listSearch = [],
  inputChange,
  showlist,
  searchAttribute = "name",
  placeHolder = "Nhập",
  iconShow = null
}) {
  const handleSearch = (list) => {
    let search = list;
    if (inputValue) {
      search = search.filter((item) =>
        item[searchAttribute]
          ? typeof item[searchAttribute] === "string"
            ? item[searchAttribute]
                .toLowerCase()
                .includes(inputValue.toLowerCase())
            : item[searchAttribute] === inputValue
          : typeof item === "string"
          ? item.toLowerCase().includes(inputValue.toLowerCase())
          : item === inputValue
      );
    }
    return search;
  };

  const filteredList = handleSearch(listSearch);

  return (
    <div className={"relative group " + className}>
      {iconShow && <div className="w-[30px] h-[30px] fill-[#01215C]">{iconShow}</div>}
      <input
        className={"w-full outline-none " + (iconShow && "px-2")}
        type={typeInput}
        name={inputName}
        value={inputValue}
        placeholder={placeHolder}
        onChange={(e) => inputChange(e.target.value)}
      />
      <div
        className="absolute overflow-auto no-scroll flex flex-col justify-start gap-[1px] left-0 top-full mt-1 w-full max-h-0 bg-zinc-200 border-2 border-[#01215C] rounded-2xl opacity-0 transition-all duration-200 ease-in-out group-hover:max-h-[200px] group-hover:opacity-100"
      >
        {listSearch.length > 0 && filteredList.length > 0 ? (
          filteredList.map((item, index) => showlist(item, index))
        ) : (
          <div className="w-full flex justify-center items-center text-center">
            <p className="p-3 bg-white rounded-2xl w-full">Danh sách trống</p>
          </div>
        )}
      </div>
    </div>
  );
}
