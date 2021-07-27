import './NavigationMobile.scss'
import React from 'react'
import classNames from 'classnames'

import { FRA } from '@core/assessment'
import PanEuropean from '@core/assessment/panEuropean'

import { useNavigationVisible } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'
import Assessment from '../Assessment'

const NavigationMobile: React.FC = () => {
  const navigationVisible = useNavigationVisible()

  const assessmentType = useAssessmentType()
  const assessment = [FRA, PanEuropean].find(({ type }) => type === assessmentType)

  return (
    <div className={classNames('navM', 'no-print', { open: navigationVisible })}>
      <Assessment assessment={assessment} />
    </div>
  )
}

export default NavigationMobile
