import './CountryStatusIndicator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentStatus } from 'meta/area/country'

type Props = { status: AssessmentStatus }

const CountryStatusIndicator = (props: Props) => {
  const { status } = props

  const { t } = useTranslation()
  return (
    <span className="country-status-indicator">
      <div className={`status-${status}`} />
      <span className={`status-${status}-label`}>{t(`assessment.status.${status}.label`)}</span>
    </span>
  )
}

export default CountryStatusIndicator
