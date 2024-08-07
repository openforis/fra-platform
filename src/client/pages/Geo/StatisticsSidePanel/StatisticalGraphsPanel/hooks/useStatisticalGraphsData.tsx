import { useMemo } from 'react'

import { BarChart as BarChartType, BarChartData } from 'meta/chart'
import {
  agreementPalette,
  ExtraEstimation,
  extraEstimationsMetadata,
  ForestKey,
  forestLayersMetadata,
  LayerSectionKey,
} from 'meta/geo'
import { ForestEstimationEntry } from 'meta/geo/geoStatistics'

import { useGeoLayer, useGeoStatistics } from 'client/store/ui/geo/hooks'

type Returned = {
  chart: BarChartType
  data: BarChartData
  error?: string
  isLoading: boolean
}

export const useStatisticalGraphsData = (): Returned => {
  const { error, isLoading, tabularForestEstimations } = useGeoStatistics()

  const agreementLayer = useGeoLayer(LayerSectionKey.Forest, ForestKey.Agreement)
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
      const { sourceKey, hansenPercent } = entry
      return hansenPercent ? `${sourceKey}${hansenPercent}` : sourceKey
    }

    const cells = tabularForestEstimations.map((entry) => {
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
      tabularForestEstimations.reduce<Record<string, number>>((acc, entry) => {
        const { area } = entry
        const sourceKey = _getSourceKey(entry)
        // eslint-disable-next-line no-param-reassign
        acc[sourceKey] = area / 1000

        return acc
      }, {}),
    ]

    return { data, error, isLoading, chart }
  }, [agreementColor, error, isLoading, tabularForestEstimations])
}
