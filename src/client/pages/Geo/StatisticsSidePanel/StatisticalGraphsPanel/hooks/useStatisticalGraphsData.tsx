import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ChartData, ChartOptions, Plugin } from 'chart.js'
import { Numbers } from 'utils/numbers'

import {
  agreementPalette,
  ExtraEstimation,
  extraEstimationsMetadata,
  ForestKey,
  forestLayersMetadata,
  LayerSectionKey,
} from 'meta/geo'

import { useGeoLayer, useGeoStatistics } from 'client/store/ui/geo/hooks'
import { GeoChartOptions, whiteBackgroundplugin } from 'client/pages/Geo/utils/chartPlugins'

type Props = {
  year: number
}

type Returned = {
  data: ChartData
  error?: string
  isLoading: boolean
  options: ChartOptions<'bar'>
  plugins: Array<Plugin>
}

export const useStatisticalGraphsData = (props: Props): Returned => {
  const { year } = props

  const { t } = useTranslation()

  const { error, isLoading, tabularForestEstimations } = useGeoStatistics()

  const agreementLayer = useGeoLayer(LayerSectionKey.Forest, ForestKey.Agreement)
  const agreementLevel = agreementLayer?.options?.agreementLayer?.level ?? 0
  const agreementColor = agreementPalette.at(agreementLevel - 1)

  return useMemo<Returned>(() => {
    const chartTitle = t('geo.statistics.forestArea.extentOfForestPerSource', { year })
    const unitLabel = t('unit.haThousand')

    const labels: Array<string> = []
    const areas: Array<number> = []
    const percentages: Array<number> = []

    tabularForestEstimations.forEach((entry) => {
      const { area, fra1ALandAreaPercentage, hansenPercent, sourceLabelKey } = entry
      areas.push(area / 1000)
      labels.push(t(sourceLabelKey, { hansenPercent }))
      percentages.push(fra1ALandAreaPercentage)
    })

    const maximumArea = Math.max(...areas)

    const backgroundColors = tabularForestEstimations.map((entry) => {
      const { sourceKey } = entry
      if (Object.values(ExtraEstimation).includes(sourceKey as ExtraEstimation)) {
        if (sourceKey === ExtraEstimation.CustomRecipe) return agreementColor
        return extraEstimationsMetadata[sourceKey as ExtraEstimation].palette[0]
      }
      if (sourceKey.toUpperCase().indexOf(ForestKey.Hansen.toUpperCase()) === -1) {
        return forestLayersMetadata[sourceKey as ForestKey].palette[0]
      }
      return forestLayersMetadata.Hansen.palette[0]
    })

    const options: GeoChartOptions = {
      backgroundColors,
      percentages,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          padding: {
            bottom: 15,
            top: 15,
          },
          text: chartTitle,
        },
        tooltip: {
          callbacks: {
            label: (value: any) => `${Numbers.format(value?.parsed?.y, 0)} (${t('unit.haThousand')})`,
          },
        },
      },
      scales: {
        Areas: {
          display: true,
          position: 'left',
          suggestedMax: maximumArea * (1 + 0.1), // Add 10 % buffer area to the top of the bars
          ticks: {
            callback(value: number) {
              return `${Numbers.format(value, 0)}`
            },
          },
          title: {
            display: true,
            text: unitLabel,
          },
          type: 'linear',
        },
        x: {
          ticks: {
            display: false,
          },
        },
      },
    }

    const plugins: Plugin[] = [
      whiteBackgroundplugin(), // Pluging to get a white background color when downloading
    ]

    const data = {
      datasets: [
        {
          backgroundColor: backgroundColors,
          data: areas,
          label: 'Area',
          yAxisID: 'Areas',
        },
      ],
      labels,
    }

    return {
      data,
      error,
      isLoading,
      options,
      plugins,
    }
  }, [agreementColor, error, isLoading, t, tabularForestEstimations, year])
}
