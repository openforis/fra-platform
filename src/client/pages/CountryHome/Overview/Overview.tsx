import React from 'react'

import { useSections } from 'client/store/metadata'
import Dashboard from 'client/components/Dashboard'
import { useDashboardItems } from 'client/pages/CountryHome/Overview/hooks'

const Overview: React.FC = () => {
  const items = useDashboardItems()

  const sections = useSections()
  if (!sections) return null

  return <Dashboard items={items} />
}

export default Overview
