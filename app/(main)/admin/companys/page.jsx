import React from 'react'
import ActionPage from './ActionPage'
import { searchCompany } from '../getData'

export default async function page() {
  const listCompany = await searchCompany()
  return (
    <ActionPage listCompany={listCompany}/>
  )
}
