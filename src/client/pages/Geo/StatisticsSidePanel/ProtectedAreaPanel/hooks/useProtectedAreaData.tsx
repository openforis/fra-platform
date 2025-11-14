import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ProtectedAreaEstimations } from 'meta/geo/protectedArea/estimations'
import { protectedAreaSources } from 'meta/geo/protectedArea/sources'

import { useGeoProtectedAreas, useGeoStatistics } from 'client/store/geo/statistics/hooks/statistics'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Returned = {
  columns: Array<string>
  errorKey?: string
  loading: boolean
  tableData: StatisticsTableData
  units: Array<string>
}

export const useProtectedAreaData = (): Returned => {
  const { t } = useTranslation()
  const geoProtectedAreas = useGeoProtectedAreas()

  const { errorKey, loading } = useGeoStatistics()

  return useMemo<Returned>(() => {
    if (loading) {
      return {
        columns: [],
        errorKey,
        loading,
        tableData: [],
        units: [],
        title: '',
      }
    }

    const columns = [t('common.source'), t('geo.treeCoverProtectedAreasWithUnit', { unit: t('unit.haThousand') })]
    const units = ['', '']

    const formattedTableData: StatisticsTableData = Object.entries(geoProtectedAreas).map(([source, value]) => {
      const formatedArea = Numbers.format(value / 1000, 0)
      const label = t(protectedAreaSources[source as keyof ProtectedAreaEstimations].titleKey)
      return [{ value: label }, { value: formatedArea }]
    })

    return {
      columns,
      errorKey,
      loading,
      tableData: formattedTableData,
      units,
    }
  }, [errorKey, geoProtectedAreas, loading, t])
}
