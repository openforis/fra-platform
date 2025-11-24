import './NavigationMobile.scss'
import React, { useEffect } from 'react'
import classNames from 'classnames'

import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useNavigationVisible } from 'client/store/ui/countryReport/hooks/navigation'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import NavAssessment from '../NavAssessment'

const NavigationMobile: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigationVisible = useNavigationVisible()

  const onClose = (): void => {
    dispatch(CountryReportActions.setNavigationVisible(false))
  }

  // Hide navigation on first mount
  useEffect(() => {
    dispatch(CountryReportActions.setNavigationVisible(false))
  }, [dispatch])

  return (
    <div className={classNames('navM', 'no-print', { open: navigationVisible })}>
      <Button
        className="navM__btnClose"
        iconName="remove"
        inverse
        onClick={onClose}
        size={ButtonSize.l}
        type={ButtonType.anonymous}
      />
      <div className="nav-mobile__assessment-container">
        <NavAssessment />
      </div>
    </div>
  )
}

export default NavigationMobile
