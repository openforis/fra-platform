import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import Link from 'client/components/Links/Link'
import StatisticsTable from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable'

import { useBurnedAreaData } from './hooks/useBurnedAreaData'

type Props = {
  year: number
}

const BurnedAreaPanel: React.FC<Props> = (props: Props) => {
  const { year } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { columns, errorKey, loading, tableData, units } = useBurnedAreaData()

  const gwisUrl = `https://gwis.jrc.ec.europa.eu/apps/gwis.statistics/estimates/${countryIso}`

  const renderContent = (): React.ReactNode => {
    if (loading) return <p>{t('common.loading')}</p>

    if (errorKey) return <p>{t('geo.error.statistics.failedToFetch', { error: t(errorKey) })}</p>

    if (tableData.length === 0) return <p>{t('geo.error.statistics.foundNoData')}</p>

    return (
      <StatisticsTable
        columns={columns}
        fileName={`burned-area-estimations-${countryIso}-${year}`}
        loaded={!loading}
        tableData={tableData}
        units={units}
      />
    )
  }

  return (
    <>
      <div className="geo-statistics-side-panel__jrc-gwis-link">
        <Link rel="noreferrer" target="_blank" to={gwisUrl}>
          {t('geo.accessJrcGwis')}
        </Link>
      </div>

      {renderContent()}
    </>
  )
}

export default BurnedAreaPanel
