import React from 'react'

import DashboardComponent from 'client/components/Dashboard'
import { useItems } from 'client/pages/CountryHome/Dashboard/hooks'

const Dashboard: React.FC = () => {
  const items = useItems()

  return <DashboardComponent items={items} />
}

export default Dashboard
