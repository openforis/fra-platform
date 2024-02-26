import React, { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { NavigationActions } from 'client/store/ui/navigation'
import { useIsGeoRoute } from 'client/hooks'
import NavAssessment from 'client/components/Navigation/NavAssessment'
import NavGeo from 'client/components/Navigation/NavGeo'

const NavigationDesktop: React.FC = () => {
  const dispatch = useAppDispatch()
  const geoRoute = useIsGeoRoute()

  // Show navigation on first mount (ex. returing from Mobile view)
  useEffect(() => {
    dispatch(NavigationActions.updateNavigationVisible(true))
  }, [dispatch])

  return (
    <div className="nav no-print">
      {geoRoute && <NavGeo />}
      {!geoRoute && <NavAssessment />}
    </div>
  )
}

export default NavigationDesktop
