import React from 'react'
import ActionPage from './ActionPage'
import { cookies } from 'next/headers'
import { getAllEmployerJob } from '../../getData'

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
  const allJob = await getAllEmployerJob(token)
  return (
    <ActionPage allJob={allJob}/>
  )
}
