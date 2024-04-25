import './NoData.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

const NoData = () => {
  const { t } = useTranslation()

  return (
    <div className="dashboard__no-data">
      <span> {t('statisticalFactsheets.noData')}</span>
    </div>
  )
}

export default NoData
