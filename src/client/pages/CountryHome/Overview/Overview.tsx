import React from 'react'

import { useDashboardItems } from 'client/store/meta/hooks/dashboard'
import { useSections } from 'client/store/meta/hooks/sections'
import Dashboard from 'client/components/Dashboard'

import { useGetDashboard } from './hooks/useGetDashboard'

const Overview: React.FC = () => {
  const sections = useSections()
  const items = useDashboardItems()
  useGetDashboard()

  if (!sections || !items) return null

  return <Dashboard items={items} />
}

export default Overview
