import './CountryStatusIndicator.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryStatus } from 'meta/area/countryStatus'

type Props = { status: CountryStatus }

const CountryStatusIndicator: React.FC<Props> = (props: Props) => {
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
