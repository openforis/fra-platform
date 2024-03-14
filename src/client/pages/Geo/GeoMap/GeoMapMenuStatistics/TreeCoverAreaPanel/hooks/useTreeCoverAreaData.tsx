import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { useGeoFra1aLandArea, useGeoStatistics } from 'client/store/ui/geo/hooks'
import { CSVData } from 'client/components/ButtonTableExport/types'

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
  const { tabularEstimationData: data, isLoading, error } = useGeoStatistics()

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
    Object.entries(data).forEach((value) => {
      const rowData = value[1]
      const sourceNameKey = rowData[0]
      const sourceName = t(sourceNameKey)
      const area = rowData[1]
      const percentage = rowData[2]
      const formatedArea = Numbers.format(area, 0)
      formattedTableData.push([sourceName, formatedArea, percentage])

      csvData.push({
        source: sourceName,
        landArea: fra1aLandArea.toString(),
        forestAreaHa: formatedArea,
        forestAreaPercentage: `${percentage} %`,
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
