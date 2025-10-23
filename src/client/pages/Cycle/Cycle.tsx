import './Cycle.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { useCountryUpdateListener } from './hooks/useCountryUpdateListener'
import { useInitAreas } from './hooks/useInitAreas'
import { useInitMetaCache } from './hooks/useInitMetaCache'

const Cycle: React.FC = () => {
  useInitAreas()
  useInitMetaCache()
  useCountryUpdateListener()

  return <Outlet />
}

export default Cycle
