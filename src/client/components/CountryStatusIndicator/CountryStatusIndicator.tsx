import './CountryStatusIndicator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentStatus } from 'meta/area/country'

type Props = { status: AssessmentStatus }

const CountryStatusIndicator = (props: Props) => {
  const { status } = props

  const { t } = useTranslation()
  return (
    <div className="country-status-indicator">
      <div className={`status-${status}`} />
      <span className={`status-${status}-label`}>{t(`assessment.status.${status}.label`)}</span>
    </div>
  )
}

export default CountryStatusIndicator
