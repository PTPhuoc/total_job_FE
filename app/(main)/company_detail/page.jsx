import React from "react";
import ActionPage from "./ActionPage";
import { getCompany } from "./getData";

export default async function page({ searchParams }) {
    const params = await searchParams
    const company = await getCompany(params.id)
  return <ActionPage companyInfo={company.company}/>;
}
