import React from 'react'
import { useTranslation } from 'react-i18next'

import { useIsSomeTableDataFetching } from 'client/store/data'

const NoData = () => {
  const { t } = useTranslation()

  const isFetching = useIsSomeTableDataFetching()
  if (isFetching) return null

  return <span> {t('statisticalFactsheets.noData')}</span>
}

export default NoData
