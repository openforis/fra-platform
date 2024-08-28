import React from 'react'
import { useTranslation } from 'react-i18next'

const NoData = () => {
  const { t } = useTranslation()

  return <span> {t('statisticalFactsheets.noData')}</span>
}

export default NoData
