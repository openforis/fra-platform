import { useMemo } from 'react'

import { BarChart as BarChartType, BarChartData } from 'meta/chart/bar'
import { agreementPalette } from 'meta/geo/agreementPalette'
import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'
import { extraEstimationsMetadata } from 'meta/geo/extraEstimation/metadata'
import { ForestEstimationEntry } from 'meta/geo/forest/estimationEntry'
import { ForestKey } from 'meta/geo/forest/key'
import { forestLayersMetadata } from 'meta/geo/forest/layersMetadata'

import { useGeoLayer } from 'client/store/geo/layers/hooks/layers'
import { useGeoStatistics } from 'client/store/geo/statistics/hooks/statistics'

type Returned = {
  chart: BarChartType
  data: BarChartData
  errorKey?: string
  loading: boolean
}

export const useStatisticalGraphsData = (): Returned => {
  const { errorKey, forestEstimationsTableData, loading } = useGeoStatistics()

  const agreementLayer = useGeoLayer(ForestKey.Agreement)
  const agreementLevel = agreementLayer?.options?.agreementLayer?.level ?? 0
  const agreementColor = agreementPalette.at(agreementLevel - 1)

  return useMemo<Returned>(() => {
    const _getBackgroundColor = (sourceKey: string): string => {
      if (Object.values(ExtraEstimation).includes(sourceKey as ExtraEstimation)) {
        if (sourceKey === ExtraEstimation.CustomRecipe) return agreementColor
        return extraEstimationsMetadata[sourceKey as ExtraEstimation].palette[0]
      }
      if (sourceKey.toUpperCase().indexOf(ForestKey.Hansen.toUpperCase()) === -1) {
        return forestLayersMetadata[sourceKey as ForestKey].palette[0]
      }
      return forestLayersMetadata.Hansen.palette[0]
    }

    // if hansen, include the hansenPercent in the label
    const _getSourceKey = (entry: ForestEstimationEntry): string => {
      const { hansenPercent, sourceKey } = entry
      return hansenPercent ? `${sourceKey}${hansenPercent}` : sourceKey
    }

    const cells = forestEstimationsTableData.map((entry) => {
      const { hansenPercent, sourceLabelKey } = entry
      const sourceKey = _getSourceKey(entry)

      return {
        color: _getBackgroundColor(sourceKey),
        label: {
          params: {
            hansenPercent,
          },
          key: sourceLabelKey,
        },
        unit: 'unit.haThousand',
        variableName: sourceKey,
      }
    })

    const chart = {
      cells,
      yAxis: {
        label: {
          key: 'unit.haThousand',
        },
      },
    } as BarChartType

    const data: BarChartData = [
      forestEstimationsTableData.reduce<Record<string, number | string>>(
        (acc, entry) => {
          const { area } = entry
          const sourceKey = _getSourceKey(entry)

          acc[sourceKey] = area / 1000

          return acc
        },
        { columnName: '' }
      ),
    ]

    return { data, errorKey, loading, chart }
  }, [agreementColor, errorKey, forestEstimationsTableData, loading])
}
