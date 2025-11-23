import React from 'react'
import ActionPage from './ActionPage'
import { cookies } from 'next/headers'
import { getAllApplies } from '../../getData'

export default async function page() {
    const token = (await cookies()).get("accessToken")?.value
    const applies = await getAllApplies(token)
  return (
    <ActionPage applies={applies}/>
  )
}
