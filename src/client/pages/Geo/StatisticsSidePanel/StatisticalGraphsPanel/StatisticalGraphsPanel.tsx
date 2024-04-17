import './StatisticalGraphsPanel.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Chart from 'client/components/ChartDeprecated'

import { useStatisticalGraphsData } from './hooks/useStatisticalGraphsData'

type Props = {
  year: number
}

const StatisticalGraphsPanel: React.FC<Props> = (props: Props) => {
  const { year } = props

  const { t } = useTranslation()

  const { data, error, isLoading, options, plugins } = useStatisticalGraphsData({ year })

  if (!isLoading && data?.datasets?.length === 0 && !error) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!isLoading && error?.length > 0) return <p>{t('geo.error.statistics.failedToFetch', { error })}</p>

  if (isLoading) return <p>{t('common.loading')}</p>

  return (
    <div className="geo-statistical-graphs-panel__container">
      <Chart data={data} options={options} plugins={plugins} type="bar" />
    </div>
  )
}

export default StatisticalGraphsPanel
