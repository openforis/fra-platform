import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import StatisticsTable from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable'

import { useProtectedAreaData } from './hooks/useProtectedAreaData'

type Props = {
  year: number
}

const ProtectedAreaPanel: React.FC<Props> = (props: Props) => {
  const { year } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { columns, error, isLoading, tableData, title, units } = useProtectedAreaData()

  if (!isLoading && tableData.length === 0 && !error) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!isLoading && error?.length > 0) return <p>{t('geo.error.statistics.failedToFetch', { error })}</p>

  if (isLoading) return <p>{t('common.loading')}</p>

  return (
    <>
      <h4 className="geo-statistics-side-panel-table-title">{title}</h4>
      <StatisticsTable
        columns={columns}
        countryIso={countryIso}
        loaded={!isLoading}
        tableData={tableData}
        units={units}
        year={year}
      />
    </>
  )
}

export default ProtectedAreaPanel
