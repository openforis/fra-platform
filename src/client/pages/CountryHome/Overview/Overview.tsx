import React from 'react'

import { useDashboardItems, useGetDashboard, useSections } from 'client/store/metadata'
import Dashboard from 'client/components/Dashboard'

const Overview: React.FC = () => {
  const sections = useSections()
  const items = useDashboardItems()
  useGetDashboard()

  if (!sections || !items) return null

  return <Dashboard items={items} />
}

export default Overview
