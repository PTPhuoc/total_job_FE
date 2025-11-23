import React from 'react'
import ActionPage from "./ActionPage"
import { cookies } from 'next/headers';
import { getAccountInfo } from '../getData';

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
    const accountInfo = await getAccountInfo(token);
  return (
    <ActionPage accountInfor={accountInfo}/>
  )
}
