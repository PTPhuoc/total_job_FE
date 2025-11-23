export const getAccountInfo = async (token) => {
  try {
    const respone = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_info/`,
      {
        method: "GET",
        headers: {
          cookie: token ? `accessToken=${token}` : "",
        },
        cache: "no-store",
      }
    );

    if (!respone.ok) throw new Error(respone.statusText);

    const responseValue = await respone.json();
    if (responseValue.status === "Success") return responseValue.accountInfo;
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getSaveJob = async (token) => {
  try {
    if (!token) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_save_job/`,
      {
        method: "GET",
        headers: { cookie: token ? `accessToken=${token}` : "" },
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error(response.statusText);
    const responseData = await response.json();
    if (responseData.status === "Success") return responseData.saveJobs;
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getSaveCompany = async (token) => {
  try {
    if (!token) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_save_company/`,
      {
        method: "GET",
        headers: { cookie: token ? `accessToken=${token}` : "" },
        cache: "no-store",
      }
    );
    if (!response.ok) throw new Error(response.statusText);
    const responseData = await response.json();
    if (responseData.status === "Success") return responseData.saveCompany;
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getCompanyEmployer = async (token) => {
  try {
    if (!token) return {};
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_info_company_employer/`,
      {
        method: "GET",
        headers: { cookie: token ? `accessToken=${token}` : "" },
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error(response.statusText);
    const responeValue = await response.json();
    if (responeValue.status === "Success") return responeValue.company;
    else return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getOneEmployerJob = async (token, id) => {
  try {
    if (!id || !token) return {};
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_employer_job/?id=${id}`,
      {
        method: "GET",
        headers: { cookie: token ? `accessToken=${token}` : "" },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return {};
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue.job;
    else return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getAllEmployerJob = async (token) => {
  try {
    if (!token) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_all_employer_job/`,
      {
        method: "GET",
        headers: { cookie: token ? `accessToken=${token}` : "" },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return {};
    }
    const responseValue = await response.json();
    if (responseValue.status === "Success") return responseValue.jobs;
    else return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getAllApplies = async (token) => {
  try {
    if (!token) return [];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/get_apply_job/`,
      { method: "GET", headers: { cookie: `accessToken=${token}` } }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return [];
    }
    const responeValue = await response.json();
    if (responeValue.status === "Success") return responeValue.applies;
    return [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getProfileCandidate = async (token, id) => {
  try {
    if(!token || !id) return {}
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PORT}api/account/preview_candidate/?id=${id}`,
      { method: "GET", headers: { cookie: `accessToken=${token}` } }
    );
    if (!response.ok) {
      console.error(response.statusText);
      return {};
    }
    const responeValue = await response.json();
    if (responeValue.status === "Success") return responeValue.candidateProfile;
    return {};
  } catch (err) {
    console.log(err)
    return {}
  }
}