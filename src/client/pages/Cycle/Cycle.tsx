import './Cycle.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useCountryStatusListener } from './hooks/useCountryStatusListener'
import { useInitAreas } from './hooks/useInitAreas'

const Cycle: React.FC = () => {
  useInitAreas()
  useCountryStatusListener()

  return <Outlet />
}

export default Cycle
