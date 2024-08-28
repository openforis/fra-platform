import React from 'react'

import { useSections } from 'client/store/metadata'
import Dashboard from 'client/components/Dashboard'
import { useItems } from 'client/pages/CountryHome/Overview/hooks'

const Overview: React.FC = () => {
  const items = useItems()

  const sections = useSections()
  if (!sections) return null

  return <Dashboard items={items} />
}

export default Overview
