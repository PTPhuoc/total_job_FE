import React from 'react'
import ActionPage from './ActionPage'
import { searchAccount } from '../getData'
import { cookies } from 'next/headers'

export default async function page() {
  const token = (await cookies()).get("accessToken")?.value
  const listAccount = await searchAccount(token)
  return (
    <ActionPage listAccount={listAccount}/>
  )
}
