import './StatisticalGraphsPanel.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Bar from 'client/components/Chart/Bar'

import { useStatisticalGraphsData } from './hooks/useStatisticalGraphsData'

type Props = {
  year: number
}

const StatisticalGraphsPanel: React.FC<Props> = (props: Props) => {
  const { year } = props
  const { t } = useTranslation()

  const title = t('geo.statistics.forestArea.extentOfForestPerSource', { year })

  const { data, chart, error, isLoading } = useStatisticalGraphsData()

  if (!isLoading && data?.length === 0 && !error) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!isLoading && error?.length > 0) return <p>{t('geo.error.statistics.failedToFetch', { error })}</p>

  if (isLoading) return <p>{t('common.loading')}</p>

  return (
    <div className="geo-statistical-graphs-panel__container">
      <div className="title">{title}</div>
      <Bar chart={chart} data={data} showLegend={false} />
    </div>
  )
}

export default StatisticalGraphsPanel
