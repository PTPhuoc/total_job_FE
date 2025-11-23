import React from "react";
import { getAllCatalog } from "./admin/getData";
import ActionPage from "./ActionPage";
import { getJobs } from "./getData";

export default async function page() {
  const catalogs = await getAllCatalog();
  const jobs = await getJobs()
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
  return (
    <ActionPage
      careers={listCareer}
      levels={listLevel}
      experiences={listExp}
      salarys={listSalary}
      formOfWorks={listFormOfWork}
      jobs={jobs}
    ></ActionPage>
  );
}
