import React from "react";
import ActionPage from "./ActionPage";
import { cookies } from "next/headers";
import { getAccountInfo } from "../getData";
import { getAllCatalog, getOneCatalog } from "../../admin/getData";

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
  const accountInfo = await getAccountInfo(token);
  const catalogs = await getAllCatalog()
  const listCareer = catalogs
    ? catalogs.filter((item) => item.type === "Nghề")
    : [];
  const listFormOfWork = catalogs
    ? catalogs.filter((item) => item.type === "Hình thức làm việc")
    : [];
  const listEdu = catalogs
    ? catalogs.filter((item) => item.type === "Trường")
    : [];
  const skillCatalog = catalogs
    ? catalogs.filter((item) => item.type === "Kỹ năng cá nhân")
    : [];
  return (
    <ActionPage
      accountInfo={accountInfo}
      listEdu={listEdu}
      skillCatalog={skillCatalog}
      listCareer={listCareer}
      listFormOfWork={listFormOfWork}
    />
  );
}
