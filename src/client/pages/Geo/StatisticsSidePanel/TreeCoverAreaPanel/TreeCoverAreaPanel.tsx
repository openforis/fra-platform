import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import StatisticalGraphsPanel from 'client/pages/Geo/StatisticsSidePanel/StatisticalGraphsPanel'
import StatisticsTable from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable'

import { useTreeCoverAreaData } from './hooks/useTreeCoverAreaData'

type Props = {
  year: number
}

const TreeCoverAreaPanel: React.FC<Props> = (props: Props) => {
  const { year } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { columns, csvData, errorKey, loading, tableData, units } = useTreeCoverAreaData()

  if (!loading && tableData.length === 0 && !errorKey) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!loading && errorKey?.length > 0) return <p>{`${t('geo.error.statistics.failedToFetch')} ${t(errorKey)}`}</p>

  if (loading) return <p>{t('common.loading')}</p>

  return (
    <>
      <StatisticalGraphsPanel year={year} />
      <StatisticsTable
        columns={columns}
        csvData={csvData}
        fileName={`tree-cover-area-estimations-${countryIso}-${year}`}
        gridTemplateColumns="1fr 0.7fr 0.7fr"
        loaded={!loading}
        tableData={tableData}
        units={units}
      />
    </>
  )
}

export default TreeCoverAreaPanel
