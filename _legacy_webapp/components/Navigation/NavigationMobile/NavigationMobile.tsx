import './NavigationMobile.scss'
import React from 'react'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'

import { Assessment } from '@core/assessment'
import { NavigationActions, useNavigationVisible } from '../../../store/navigation'

import Icon from '../../../components/icon'
import NavAssessment from '../NavAssessment'

type Props = {
  assessment: Assessment
}

const NavigationMobile: React.FC<Props> = (props) => {
  const { assessment } = props

  const dispatch = useDispatch()
  const navigationVisible = useNavigationVisible()

  return (
    <div className={classNames('navM', 'no-print', { open: navigationVisible })}>
      <button
        className="btn btn-s btn-secondary navM__btnClose"
        onClick={() => dispatch(NavigationActions.toggleNavigationVisibility())}
        type="button"
      >
        <Icon name="remove" className="icon-close icon-24" />
      </button>
      <NavAssessment assessment={assessment} />
    </div>
  )
}

export default NavigationMobile
