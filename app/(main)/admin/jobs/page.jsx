import React from 'react'
import ActionPage from './ActionPage'
import { getJobs } from '../../getData'

export default async function page() {
  const allJob = await getJobs()
  return (
    <ActionPage listJob={allJob}/>
  )
}
