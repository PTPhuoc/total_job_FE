"use client";

import React, { useEffect, useState } from "react";

export default function InputAddress({
  inputValue,
  handleChange,
  designInput = "border-b-2 border-zinc-200 duration-200 ease-in focus:border-[#01215C]",
}) {
  const listCity = [];
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
      addressValue.city + (addressValue.district && `,${addressValue.district}`) + (addressValue.ward && `,${addressValue.ward}`)
    );
  }, [addressValue]);

  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        className={`flex-1 outline-none ${designInput}`}
        placeholder="Thành phố/Tỉnh"
        name="city"
        value={addressValue.city}
        onChange={(e) =>
          setAddressValue({ ...addressValue, [e.target.name]: e.target.value })
        }
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
