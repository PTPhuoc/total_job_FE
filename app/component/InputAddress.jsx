"use client";

import React, { useEffect, useState } from "react";
import InputListSearch from "./InputListSearch";
import { listCity } from "../data";

export default function InputAddress({
  inputValue,
  handleChange,
  designInput = "border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]",
}) {
  const district = [];
  const ward = [];
  const [addressValue, setAddressValue] = useState(() => {
    if (inputValue) {
      const [city, district, ward] = inputValue.split(",");
      return {
        city: city || "",
        district: district || "",
        ward: ward || "",
      };
    }
    return {
      city: "",
      district: "",
      ward: "",
    };
  });

  useEffect(() => {
    handleChange(
      addressValue.city +
        (addressValue.district && `,${addressValue.district}`) +
        (addressValue.ward && `,${addressValue.ward}`)
    );
  }, [addressValue]);

  return (
    <div className="flex gap-3 items-center">
      <InputListSearch
        inputValue={addressValue.city}
        inputChange={(value) =>
          setAddressValue({ ...addressValue, city: value })
        }
        inputName={"city"}
        listSearch={listCity}
        placeHolder="Thành phố/Tỉnh"
        className={`flex-1 outline-none ${designInput}`}
        showlist={(item, index) => (
          <button
            key={index}
            className="bg-white py-1 duration-200 ease-in hover:bg-zinc-100"
            onClick={() =>
              setAddressValue({ ...addressValue, city: item.name })
            }
          >
            {item.name}
          </button>
        )}
      />
      <input
        type="text"
        className={`flex-1 outline-none ${designInput}`}
        placeholder="Quận/Huyện"
        name="district"
        value={addressValue.district}
        onChange={(e) =>
          setAddressValue({ ...addressValue, [e.target.name]: e.target.value })
        }
      />
      <input
        type="text"
        className={`flex-1 outline-none ${designInput}`}
        placeholder="Phường/Xã"
        name="ward"
        value={addressValue.ward}
        onChange={(e) =>
          setAddressValue({ ...addressValue, [e.target.name]: e.target.value })
        }
      />
    </div>
  );
}
