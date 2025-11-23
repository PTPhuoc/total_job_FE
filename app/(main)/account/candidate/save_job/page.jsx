import React from 'react'
import ActionPage from './ActionPage'
import { cookies } from 'next/headers'
import { getSaveJob } from '../../getData'

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
  const listSaveJob = await getSaveJob(token)
  return (
    <ActionPage saveJobValue={listSaveJob}/>
  )
}
