import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { useGeoFra1aLandArea, useGeoStatistics } from 'client/store/ui/geo/hooks'
import { CSVData } from 'client/pages/Geo/ButtonCSVExport/types'

type Returned = {
  columns: Array<string>
  csvData?: CSVData
  error?: string
  isLoading: boolean
  tableData: (string | number)[][]
  units: Array<string>
}

export const useTreeCoverAreaData = (): Returned => {
  const { t } = useTranslation()

  const fra1aLandArea = useGeoFra1aLandArea()
  const { tabularForestEstimations: data, isLoading, error } = useGeoStatistics()

  return useMemo<Returned>(() => {
    if (isLoading) {
      return {
        columns: [],
        error,
        isLoading,
        tableData: [],
        units: [],
      }
    }

    const columns = [
      t('common.source'),
      t('geo.forestArea'),
      t('geo.statistics.forestArea.forestAreaPercentOfLandArea'),
    ]

    const csvHeaders = [
      { label: t('common.source'), key: 'source' },
      { label: t('geo.statistics.forestArea.landArea'), key: 'landArea' },
      { label: t('geo.statistics.forestArea.forestAreaHa'), key: 'forestAreaHa' },
      { label: t('geo.statistics.forestArea.forestAreaPercentOfLandArea'), key: 'forestAreaPercentage' },
    ]
    const csvData: { source: string; landArea: string; forestAreaHa: string; forestAreaPercentage: string }[] = []

    const units = ['', t('unit.ha'), '%']

    const formattedTableData: (string | number)[][] = []
    data.forEach((entry) => {
      const { area, fra1ALandAreaPercentage, sourceName } = entry
      const formatedArea = Numbers.format(area, 0)
      formattedTableData.push([sourceName, formatedArea, fra1ALandAreaPercentage])

      csvData.push({
        forestAreaHa: formatedArea,
        forestAreaPercentage: `${fra1ALandAreaPercentage} %`,
        landArea: fra1aLandArea.toString(),
        source: sourceName,
      })
    })

    const customCsvData = {
      headers: csvHeaders,
      data: csvData,
    }

    return {
      columns,
      csvData: customCsvData,
      error,
      isLoading,
      tableData: formattedTableData,
      units,
    }
  }, [data, error, fra1aLandArea, isLoading, t])
}
