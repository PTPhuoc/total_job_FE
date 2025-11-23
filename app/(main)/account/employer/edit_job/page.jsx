import React from "react";
import ActionPage from "./ActionPage";
import { cookies } from "next/headers";
import { getCompanyEmployer, getOneEmployerJob } from "../../getData";
import { getAllCatalog } from "@/app/(main)/admin/getData";

export default async function page({ searchParams }) {
  const params = await searchParams
  const token = (await cookies()).get("accessToken")?.value;
  const accountValue = await getCompanyEmployer(token);
  const jobInfo = await getOneEmployerJob(token, params.id)
  const catalogs = await getAllCatalog();
  const listCareer = catalogs
    ? catalogs.filter((item) => item.type === "Nghề")
    : [];
  const listLevel = catalogs
    ? catalogs.filter((item) => item.type === "Cấp bật")
    : [];
  const listExp = catalogs
    ? catalogs.filter((item) => item.type === "Kinh nghiệm")
    : [];
  const listSalary = catalogs
    ? catalogs.filter((item) => item.type === "Lương")
    : [];
  const listFormOfWork = catalogs
    ? catalogs.filter((item) => item.type === "Hình thức làm việc")
    : [];
  const educations = catalogs
    ? catalogs.filter((item) => item.type === "Học vấn")
    : [];
  const recruitments = catalogs
    ? catalogs.filter((item) => item.type === "Số lượng")
    : [];
  return (
    <ActionPage
      accountValue={accountValue}
      careers={listCareer}
      levels={listLevel}
      experiences={listExp}
      salarys={listSalary}
      formOfWorks={listFormOfWork}
      educations={educations}
      recruitments={recruitments}
      jobInfo={jobInfo}
    />
  );
}
