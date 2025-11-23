export const getOneJob = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/job/get_one/?id=${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(response.status);
    }
    const responseValue = await response.json()
    if(responseValue.status === "Success") return responseValue.job
    return {}
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getJobDesc = async (id) => {
  try {
    if(!id) return []
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/job/get_desc/?id=${id}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      console.error(response.status);
      return []
    }
    const responseValue = await response.json()
    if(responseValue.status === "Success") return responseValue.jobDesc
    return []
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const checkContent = async (id) => {
  try {
    if(!id) return 100
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/job/check_content/?id=${id}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      console.error(response.status); return 100
    }
    const responseValue = await response.json()
    if(responseValue.status === "Success") return responseValue.score
    return 100
  } catch (err) {
    console.log(err);
    return 100;
  }
};

export const checkSaveJob = async (token, id) => {
  try {
    if (!token || !id) return "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/check_save/?id=${id}`,
      {
        method: "GET",
        headers: { cookie: token ? `accessToken=${token}` : "" },
        cache: "no-store",
      }
    );

    if (!response.ok) {console.error(response.statusText); return ""}
    const responseValue = await response.json()
    if(responseValue.status === "Success") return responseValue.saveJobValue
    return {}
  } catch (err) {
    console.log(err);
    return {}
  }
};

export const checkApply = async (token, id) => {
  try {
    if (!token || !id) return "";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/check_apply/?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { cookie: token ? `accessToken=${token}` : "" },
      }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return "";
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue.appliedId;
    else return "";
  } catch (err) {
    console.log(err);
    return "";
  }
};

export const checkValue = [
  { score: 100, color: "#3ECC25", text: "An toàn" },
  { score: 80, color: "#9FCC25", text: "Tạm ổn" },
  { score: 60, color: "#CCB925", text: "Nghi ngờ" },
  { score: 40, color: "#CC8125", text: "Cẩn thận" },
  { score: 20, color: "#CC5425", text: "Nguy hiểm" },
  { score: 0, color: "#CC2525", text: "Rất nguy hiểm" },
];
