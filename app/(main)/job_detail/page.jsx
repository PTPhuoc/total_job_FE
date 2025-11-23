import React from "react";
import ActionPage from "./ActionPage";
import { cookies } from "next/headers";
import { checkApply, checkContent, checkSaveJob, getJobDesc, getOneJob } from "./getData";

export default async function page({ searchParams }) {
  const params = await searchParams;
  const token = (await cookies()).get("accessToken")?.value;
  const saveJobValue = await checkSaveJob(token, params.id);
  const job = await getOneJob(params.id);
  const job_desc = await getJobDesc(params.id);
  const sortDesc = (list_desc) => {
    if (list_desc && list_desc.length > 0) {
      return list_desc.sort((a, b) => a.order - b.order);
    }
    return [];
  };
  const scoreContent = await checkContent(params.id);
  const checkApplyValue = await checkApply(token, params.id)
  return (
    <ActionPage
      jobInfo={job}
      jobDesc={sortDesc(job_desc)}
      jobScore={scoreContent}
      saveJobValue={saveJobValue ? saveJobValue : {saveJobValue: {job: "", company: ""}}}
      checkApply={checkApplyValue}
    />
  );
}
