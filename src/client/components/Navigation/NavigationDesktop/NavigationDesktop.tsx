import React, { useEffect } from 'react'

import { useAppDispatch } from 'client/store'
import { NavigationActions } from 'client/store/ui/navigation'

import NavAssessment from '../NavAssessment'

const NavigationDesktop: React.FC = () => {
  const dispatch = useAppDispatch()

  // Show navigation on first mount (ex. returing from Mobile view)
  useEffect(() => {
    dispatch(NavigationActions.updateNavigationVisible(true))
  }, [dispatch])

  return (
    <div className="nav no-print">
      <NavAssessment />
    </div>
  )
}

export default NavigationDesktop
