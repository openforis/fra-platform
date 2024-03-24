import './NavigationDesktop.scss'
import React, { useCallback, useEffect, useRef } from 'react'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store'
import { NavigationActions } from 'client/store/ui/navigation'
import { useIsGeoRoute } from 'client/hooks'
import NavAssessment from 'client/components/Navigation/NavAssessment'
import NavGeo from 'client/components/Navigation/NavGeo'

import { useMaxHeight } from './hooks/useMaxHeight'

const NavigationDesktop: React.FC = () => {
  const dispatch = useAppDispatch()
  const geoRoute = useIsGeoRoute()

  const { maxHeight, top } = useMaxHeight()
  const elementRef = useRef<HTMLDivElement>()

  // Show navigation on first mount (ex. returning from Mobile view)
  useEffect(() => {
    dispatch(NavigationActions.updateNavigationVisible(true))
  }, [dispatch])

  const toggleExpanded = useCallback(() => {
    elementRef.current?.classList.toggle('expanded')
  }, [])

  return (
    <div
      ref={elementRef}
      className={classNames('nav', 'nav-desktop', 'no-print', { geoRoute })}
      style={{ maxHeight, top: geoRoute ? top : undefined }}
    >
      {geoRoute && <NavGeo toggleExpanded={toggleExpanded} />}
      {!geoRoute && <NavAssessment />}
    </div>
  )
}

export default NavigationDesktop
