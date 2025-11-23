import React from "react";

export const handleContent = (content, attribute) => {
  const listString = content.split(attribute);

  if (listString.length > 1) {
    return listString.map((item, index) => (
      <React.Fragment key={index}>
        {item && attribute + item}
        {item && index !== listString.length - 1 && <br />}
      </React.Fragment>
    ));
  }

  return content;
};

export const resultCheck = (value) => {
  if (value < 20) {
    return { color: "#ff0000", title: "Nguy hiểm" }; // Đỏ
  } else if (value < 40) {
    return { color: "#ff9900", title: "Cẩn thận" };   // Cam
  } else if (value < 60) {
    return { color: "#ffff00", title: "Ổn" };        // Vàng
  } else if (value < 80) {
    return { color: "#66cc66", title: "Khá Ổn" };    // Xanh lá nhạt
  } else {
    return { color: "#00cc00", title: "An toàn" };   // Xanh lá đậm
  }
};
