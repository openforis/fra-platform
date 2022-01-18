import './NavigationMobile.scss'
import React from 'react'
import classNames from 'classnames'

import Icon from '@webapp/components/icon'
import { NavigationActions, useNavigationVisible } from '@client/store/ui/navigation'
import { useAppDispatch } from '@client/store'
import NavAssessment from '../NavAssessment'

const NavigationMobile: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigationVisible = useNavigationVisible()

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
