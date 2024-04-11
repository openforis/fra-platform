import React from 'react'

import Dashboard from 'client/components/Dashboard'
import { useItems } from 'client/pages/CountryHome/Overview/hooks'

const Overview: React.FC = () => {
  const items = useItems()

  return <Dashboard items={items} />
}

export default Overview
