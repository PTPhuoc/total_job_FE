import React from 'react'
import ActionPage from './ActionPage'
import { cookies } from 'next/headers'
import { getNotify } from './getData'

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
  const listNotify = await getNotify(token)
  console.log(listNotify)
  return (
    <ActionPage listNotify={listNotify}/>
  )
}
