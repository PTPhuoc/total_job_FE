export const getAllCatalog = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_PORT + "api/catalog/get/",
      { cache: "no-store" }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return [];
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue.catalogs;
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getOneCatalog = async (type) => {
  try {
    if (!type) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/catalog/get_one/?type=${type}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return [];
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue.catalogs;
    else return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const checkCrawl = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_PORT + "api/crawl/check/",
      { cache: "no-store" }
    );
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue.taskId;

    return "";
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const searchCompany = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/company/search/`
    );
    if (!response.ok) {
      console.error(response.statusText);
      return [];
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue;
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const searchAccount = async (token) => {
  try {
    if (!token) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/admin/get_account/`,
      { method: "GET", headers: { cookie: `accessToken=${token}` } }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return [];
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue;
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const listTypeCatalog = [
  { id: 1, name: "Nghề" },
  { id: 2, name: "Kinh nghiệm" },
  { id: 3, name: "Cấp bật" },
  { id: 4, name: "Hình thức làm việc" },
  { id: 5, name: "Lương" },
  { id: 6, name: "Học vấn" },
  { id: 7, name: "Số lượng" },
  { id: 8, name: "Trường" },
  { id: 9, name: "Kỹ năng cá nhân" },
];

export const valueCatalog = {
  id: "",
  name: "",
  type: "",
  subName: "",
  subId: "",
};

export const setRole = {
  Admin: "Quản trị viên",
  Candidate: "Ứng viên",
  Employer: "Nhà tuyển dụng"
}