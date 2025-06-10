import './Cycle.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useCountryUpdateListener } from 'client/pages/Cycle/hooks/useCountryUpdateListener'

import { useInitAreas } from './hooks/useInitAreas'

const Cycle: React.FC = () => {
  useInitAreas()
  useCountryUpdateListener()

  return <Outlet />
}

export default Cycle
