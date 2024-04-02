import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { useGeoBurnedAreaMODIS, useGeoStatistics } from 'client/store/ui/geo/hooks'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Returned = {
  columns: Array<string>
  error?: string
  isLoading: boolean
  tableData: StatisticsTableData
  title: string
  units: Array<string>
}

export const useBurnedAreaData = (): Returned => {
  const { t } = useTranslation()
  const geoBurnedAreaMODIS = useGeoBurnedAreaMODIS()

  const { isLoading, error } = useGeoStatistics()

  return useMemo<Returned>(() => {
    if (isLoading) {
      return {
        columns: [],
        error,
        isLoading,
        tableData: [],
        title: '',
        units: [],
      }
    }

    const title = t('geo.statistics.burnedArea.burnedAreaByYear')
    const columns = [t('common.source'), t('common.year'), t('geo.burnedArea')]
    const units = ['', '', t('unit.ha')]

    const formattedTableData: StatisticsTableData = []
    geoBurnedAreaMODIS.forEach(({ ba: area, year }) => {
      const sourceName = t('geo.sections.burnedArea.layerTitles.modis')
      const formatedArea = Numbers.format(area, 0)
      formattedTableData.push([{ value: sourceName }, { value: year }, { value: formatedArea }])
    })

    return {
      columns,
      error,
      isLoading,
      tableData: formattedTableData,
      title,
      units,
    }
  }, [error, geoBurnedAreaMODIS, isLoading, t])
}
