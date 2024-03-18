import './NavigationDesktop.scss'
import React, { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { NavigationActions } from 'client/store/ui/navigation'
import { useIsGeoRoute } from 'client/hooks'
import NavAssessment from 'client/components/Navigation/NavAssessment'
import NavGeo from 'client/components/Navigation/NavGeo'

import { useMaxHeight } from './hooks/useMaxHeight'

const NavigationDesktop: React.FC = () => {
  const dispatch = useAppDispatch()
  const geoRoute = useIsGeoRoute()

  const maxHeight = useMaxHeight()

  // Show navigation on first mount (ex. returning from Mobile view)
  useEffect(() => {
    dispatch(NavigationActions.updateNavigationVisible(true))
  }, [dispatch])

  return (
    <div className="nav nav-desktop no-print" style={{ maxHeight }}>
      {geoRoute && <NavGeo />}
      {!geoRoute && <NavAssessment />}
    </div>
  )
}

export default NavigationDesktop
