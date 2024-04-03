import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { ExtraEstimation, extraEstimationsMetadata, ForestKey, forestLayersMetadata } from 'meta/geo'

import { useGeoFra1aLandArea, useGeoStatistics } from 'client/store/ui/geo/hooks'
import { CSVData } from 'client/pages/Geo/ButtonCSVExport/types'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Returned = {
  columns: Array<string>
  csvData?: CSVData
  error?: string
  isLoading: boolean
  tableData: StatisticsTableData
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
      t('geo.forestArea', { unit: t('unit.haThousand') }),
      t('geo.statistics.forestArea.forestAreaPercentOfLandArea'),
    ]

    const csvHeaders = [
      { label: t('common.source'), key: 'source' },
      { label: t('geo.statistics.forestArea.landArea'), key: 'landArea' },
      { label: t('geo.forestArea', { unit: t('unit.haThousand') }), key: 'forestAreaHa' },
      { label: t('geo.statistics.forestArea.forestAreaPercentOfLandArea'), key: 'forestAreaPercentage' },
    ]
    const csvData: { source: string; landArea: string; forestAreaHa: string; forestAreaPercentage: string }[] = []

    const units = ['', '', '%']

    const formattedTableData: StatisticsTableData = []
    data.forEach((entry) => {
      const { area, fra1ALandAreaPercentage, sourceName, sourceKey } = entry
      const formatedArea = Numbers.format(area / 1000, 0)
      const sourceBackgroundColor =
        forestLayersMetadata[sourceKey as ForestKey]?.palette?.[0] ??
        extraEstimationsMetadata[sourceKey as ExtraEstimation]?.palette?.[0]

      formattedTableData.push([
        {
          color: sourceBackgroundColor,
          value: sourceName,
        },
        { value: formatedArea },
        { value: fra1ALandAreaPercentage },
      ])

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
