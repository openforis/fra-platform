import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import StatisticsTable from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable'

import { useProtectedAreaData } from './hooks/useProtectedAreaData'

type Props = {
  year: number
}

const ProtectedAreaPanel: React.FC<Props> = (props: Props) => {
  const { year } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { columns, errorKey, loading, tableData, units } = useProtectedAreaData()

  if (!loading && tableData.length === 0 && !errorKey) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!loading && errorKey?.length > 0) return <p>{`${t('geo.error.statistics.failedToFetch')} ${t(errorKey)}`}</p>

  if (loading) return <p>{t('common.loading')}</p>

  return (
    <StatisticsTable
      columns={columns}
      fileName={`protected-area-estimations-${countryIso}-${year}`}
      loaded={!loading}
      tableData={tableData}
      units={units}
    />
  )
}

export default ProtectedAreaPanel
