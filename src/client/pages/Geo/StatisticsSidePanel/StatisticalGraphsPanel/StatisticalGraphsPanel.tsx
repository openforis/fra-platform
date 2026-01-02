import './StatisticalGraphsPanel.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Bar from 'client/components/Chart/Bar'

import { useStatisticalGraphsData } from './hooks/useStatisticalGraphsData'

const StatisticalGraphsPanel: React.FC = () => {
  const { t } = useTranslation()

  const title = t('geo.statistics.forestArea.extentOfForestPerSource')

  const { chart, data, errorKey, loading } = useStatisticalGraphsData()

  if (!loading && data?.length === 0 && !errorKey) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!loading && errorKey?.length > 0) {
    return <p>{t('geo.error.statistics.failedToFetch', { error: t(errorKey) })}</p>
  }

  if (loading) return <p>{t('common.loading')}</p>

  return (
    <div className="geo-statistical-graphs-panel__container">
      <div className="title">{title}</div>
      <Bar chart={chart} data={data} showLegend={false} />
    </div>
  )
}

export default StatisticalGraphsPanel
