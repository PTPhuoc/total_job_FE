import { format } from "date-fns";

export const monthList = [
  { value: 1, name: "Tháng 1" },
  { value: 2, name: "Tháng 2" },
  { value: 3, name: "Tháng 3" },
  { value: 4, name: "Tháng 4" },
  { value: 5, name: "Tháng 5" },
  { value: 6, name: "Tháng 6" },
  { value: 7, name: "Tháng 7" },
  { value: 8, name: "Tháng 8" },
  { value: 9, name: "Tháng 9" },
  { value: 10, name: "Tháng 10" },
  { value: 11, name: "Tháng 11" },
  { value: 12, name: "Tháng 12" },
];

export const yearList = (limitList = 30) => {
  const getDate = new Date();
  const currentYear = getDate.getFullYear();
  let list = [];
  for (let i = 0; i <= limitList; i++) {
    list.push({ value: currentYear - i, name: "Năm " + (currentYear - i) });
  }
  return list;
};

export const formatDate = (stringDate) => {
  if (!stringDate) return stringDate;
  const formattedDate = format(new Date(stringDate), "dd/MM/yyyy");
  return formattedDate;
};
