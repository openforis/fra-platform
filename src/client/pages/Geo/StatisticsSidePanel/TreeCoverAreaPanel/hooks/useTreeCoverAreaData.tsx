import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'

import { agreementPalette, ExtraEstimation, extraEstimationsMetadata, ForestKey, forestLayersMetadata } from 'meta/geo'

import { useGeoLayer } from 'client/store/geo/layers/hooks/layers'
import { useGeoFra1aLandArea, useGeoStatistics } from 'client/store/geo/statistics/hooks/statistics'
import { CSVData } from 'client/pages/Geo/ButtonCSVExport/types'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Returned = {
  columns: Array<string>
  csvData?: CSVData
  errorKey?: string
  loading: boolean
  tableData: StatisticsTableData
  units: Array<string>
}

export const useTreeCoverAreaData = (): Returned => {
  const { t } = useTranslation()

  const fra1aLandArea = useGeoFra1aLandArea()
  const { errorKey, forestEstimationsTableData: data = [], loading } = useGeoStatistics()
  const agreementLayer = useGeoLayer(ForestKey.Agreement)
  const agreementLevel = agreementLayer?.options?.agreementLayer?.level ?? 0
  const agreementColor = agreementPalette.at(agreementLevel - 1)

  return useMemo<Returned>(() => {
    if (loading) {
      return {
        columns: [],
        errorKey,
        loading,
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
    const csvData: Array<{ source: string; landArea: string; forestAreaHa: string; forestAreaPercentage: string }> = []

    const units = ['', '', '%']

    const formattedTableData: StatisticsTableData = []
    data.forEach((entry) => {
      const { area, fra1ALandAreaPercentage, hansenPercent, sourceKey, sourceLabelKey } = entry
      const formatedArea = Numbers.format(area / 1000, 0)
      const sourceName = t(sourceLabelKey, { hansenPercent })

      let sourceBackgroundColor =
        forestLayersMetadata[sourceKey as ForestKey]?.palette?.[0] ??
        extraEstimationsMetadata[sourceKey as ExtraEstimation]?.palette?.[0]

      if (sourceKey === ExtraEstimation.CustomRecipe) sourceBackgroundColor = agreementColor

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
      errorKey,
      loading,
      tableData: formattedTableData,
      units,
    }
  }, [agreementColor, data, errorKey, fra1aLandArea, loading, t])
}
