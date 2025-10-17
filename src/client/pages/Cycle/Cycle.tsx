import './Cycle.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useCountryUpdateListener } from 'client/pages/Cycle/hooks/useCountryUpdateListener'

import { useCycleRedirect } from './hooks/useCycleRedirect'
import { useInitAreas } from './hooks/useInitAreas'

const Cycle: React.FC = () => {
  useInitAreas()
  useCountryUpdateListener()
  useCycleRedirect()

  return <Outlet />
}

export default Cycle
