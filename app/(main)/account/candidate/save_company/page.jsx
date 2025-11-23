import React from 'react'
import ActionPage from './ActionPage'
import { cookies } from 'next/headers'
import { getSaveCompany } from '../../getData'

export default async function page() {
    const token = (await cookies()).get("accessToken")?.value
    const saveCompanyValue = await getSaveCompany(token)
  return (
    <ActionPage saveCompanyValue={saveCompanyValue}/>
  )
}
