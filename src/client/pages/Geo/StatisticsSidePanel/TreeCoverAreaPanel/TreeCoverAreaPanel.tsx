import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
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

  const { columns, csvData, error, isLoading, tableData, units } = useTreeCoverAreaData()

  if (!isLoading && tableData.length === 0 && !error) return <p>{t('geo.error.statistics.foundNoData')}</p>

  if (!isLoading && error?.length > 0) return <p>{t('geo.error.statistics.failedToFetch', { error })}</p>

  if (isLoading) return <p>{t('common.loading')}</p>

  return (
    <>
      <StatisticalGraphsPanel year={year} />
      <StatisticsTable
        columns={columns}
        csvData={csvData}
        fileName={`tree-cover-area-estimations-${countryIso}-${year}`}
        gridTemplateColumns="1fr 0.7fr 0.7fr"
        loaded={!isLoading}
        tableData={tableData}
        units={units}
      />
    </>
  )
}

export default TreeCoverAreaPanel
