import React from 'react'
import ActionPage from './ActionPage'
import { cookies } from 'next/headers'
import { getCompanyEmployer } from '../../getData'
import { getOneCatalog } from '@/app/(main)/admin/getData'

export default async function page() {
    const token = (await cookies()).get("accessToken")?.value
    const companyValue = await getCompanyEmployer(token)
    const listField = await getOneCatalog("Nghề")
  return (
    <ActionPage companyInfo={companyValue} listFieldValue={listField}/>
  )
}
