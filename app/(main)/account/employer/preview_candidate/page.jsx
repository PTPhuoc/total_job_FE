import { cookies } from 'next/headers'
import React from 'react'
import { getProfileCandidate } from '../../getData'
import ActionPage from './ActionPage'

export default async function page({ searchParams}) {
  const params = await searchParams
    const token = (await cookies()).get("accessToken")?.value
    const profile = await getProfileCandidate(token, params.id)
    console.log(profile)
  return (
    <ActionPage profile={profile}/>
  )
}
