import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { useGeoBurnedAreaMODIS, useGeoStatistics } from 'client/store/geo/statistics/hooks/statistics'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Returned = {
  columns: Array<string>
  errorKey?: string
  loading: boolean
  tableData: StatisticsTableData
  title: string
  units: Array<string>
}

export const useBurnedAreaData = (): Returned => {
  const { t } = useTranslation()
  const geoBurnedAreaMODIS = useGeoBurnedAreaMODIS()

  const { errorKey, loading } = useGeoStatistics()

  return useMemo<Returned>(() => {
    if (loading) {
      return {
        columns: [],
        errorKey,
        loading,
        tableData: [],
        title: '',
        units: [],
      }
    }

    const title = t('geo.statistics.burnedArea.burnedAreaByYear')
    const columns = [t('common.source'), t('common.year'), t('geo.burnedAreaWithUnit', { unit: t('unit.ha') })]
    const units = ['', '', '']

    const formattedTableData: StatisticsTableData = []
    geoBurnedAreaMODIS?.forEach(({ ba: area, year }) => {
      const sourceName = t('geo.sections.burnedArea.layerTitles.modis')
      const formatedArea = Numbers.format(area, 0)
      formattedTableData.push([{ value: sourceName }, { value: year }, { value: formatedArea }])
    })

    return {
      columns,
      errorKey,
      loading,
      tableData: formattedTableData,
      title,
      units,
    }
  }, [errorKey, geoBurnedAreaMODIS, loading, t])
}
