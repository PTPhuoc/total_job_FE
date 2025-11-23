import React from 'react'
import { checkCrawl } from '../getData'
import ListOption from './listOption'

export default async function page() {
  const getStateCrawl = await checkCrawl()
  return (
    <ListOption stateCrawl={getStateCrawl}/>
  )
}
