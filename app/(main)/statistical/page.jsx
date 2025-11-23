import React from 'react'
import ActionPage from './ActionPage'
import { getInfoChart } from './getData'

export default async function page() {
  const infoChart = await getInfoChart()
  console.log(infoChart)
  return (
    <ActionPage infoChart={infoChart}/>
  )
}
