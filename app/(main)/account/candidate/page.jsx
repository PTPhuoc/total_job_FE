import React from "react";
import ActionPage from "./ActionPage";
import { cookies } from "next/headers";
import { getAccountInfo } from "../getData";
import { getOneCatalog } from "../../admin/getData";

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
  const accountInfo = await getAccountInfo(token);
  const schoolCatalog = await getOneCatalog("Trường");
  const skillCatalog = await getOneCatalog("Kỹ năng cá nhân");
  return (
    <ActionPage
      accountInfo={accountInfo}
      schoolCatalog={schoolCatalog}
      skillCatalog={skillCatalog}
    />
  );
}
