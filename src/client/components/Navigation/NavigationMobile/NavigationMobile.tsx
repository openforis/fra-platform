import './NavigationMobile.scss'
import React, { useEffect } from 'react'

import classNames from 'classnames'

import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useNavigationVisible } from 'client/store/ui/countryReport/hooks/navigation'
import Icon from 'client/components/Icon'

import NavAssessment from '../NavAssessment'

const NavigationMobile: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigationVisible = useNavigationVisible()

  // Hide navigation on first mount
  useEffect(() => {
    dispatch(CountryReportActions.setNavigationVisible(false))
  }, [dispatch])

  return (
    <div className={classNames('navM', 'no-print', { open: navigationVisible })}>
      <button
        className="btn btn-s btn-secondary navM__btnClose"
        onClick={() => dispatch(CountryReportActions.setNavigationVisible(false))}
        type="button"
      >
        <Icon className="icon-close icon-24" name="remove" />
      </button>
      <div className="nav-mobile__assessment-container">
        <NavAssessment />
      </div>
    </div>
  )
}

export default NavigationMobile
