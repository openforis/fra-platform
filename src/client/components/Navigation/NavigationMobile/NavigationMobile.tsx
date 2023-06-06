import './NavigationMobile.scss'
import React, { useEffect } from 'react'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store'
import { NavigationActions, useNavigationVisible } from 'client/store/ui/navigation'
import Icon from 'client/components/Icon'

import NavAssessment from '../NavAssessment'

const NavigationMobile: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigationVisible = useNavigationVisible()

  // Hide navigation on first mount
  useEffect(() => {
    dispatch(NavigationActions.updateNavigationVisible(false))
  }, [dispatch])

  return (
    <div className={classNames('navM', 'no-print', { open: navigationVisible })}>
      <button
        className="btn btn-s btn-secondary navM__btnClose"
        onClick={() => dispatch(NavigationActions.updateNavigationVisible(false))}
        type="button"
      >
        <Icon name="remove" className="icon-close icon-24" />
      </button>
      <NavAssessment />
    </div>
  )
}

export default NavigationMobile
