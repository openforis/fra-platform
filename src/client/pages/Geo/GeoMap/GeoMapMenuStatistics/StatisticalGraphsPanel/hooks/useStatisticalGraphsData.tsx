import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ChartData, ChartOptions, Plugin } from 'chart.js'
import { Numbers } from 'utils/numbers'

import { ExtraEstimation, extraEstimationsMetadata, ForestKey, forestLayersMetadata } from 'meta/geo'

import { useGeoStatistics } from 'client/store/ui/geo/hooks'
import { displayPercentagesPlugin, whiteBackgroundplugin } from 'client/pages/Geo/utils/chartPlugins'

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

  const { tabularEstimationData, isLoading, error } = useGeoStatistics()

  return useMemo<Returned>(() => {
    const chartTitle = t('geo.statistics.forestArea.extentOfForestPerSource', { year })
    const unitLabel = t('unit.haMillion')

    const labels: Array<string> = []
    const areas: Array<number> = []
    const percentages: Array<number> = []

    tabularEstimationData.forEach((row) => {
      labels.push(row[0])
      areas.push(row[1])
      percentages.push(row[2])
    })

    const maximumArea = Math.max(...areas)

    const backgroundColors = tabularEstimationData.map((row) => {
      const sourceKey = row[3] as ForestKey | ExtraEstimation
      if (Object.values(ExtraEstimation).includes(sourceKey as ExtraEstimation)) {
        return extraEstimationsMetadata[sourceKey as ExtraEstimation].palette[0]
      }
      if (sourceKey.toUpperCase().indexOf(ForestKey.Hansen.toUpperCase()) === -1) {
        return forestLayersMetadata[sourceKey as ForestKey].palette[0]
      }
      return forestLayersMetadata.Hansen.palette[0]
    })

    const options = {
      percentages,
      backgroundColors,
      plugins: {
        tooltip: {
          callbacks: {
            label: (value: any) => `${Numbers.format(value?.parsed?.y, 0)} ${t('unit.ha')}`,
          },
        },
        title: {
          display: true,
          text: chartTitle,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        Areas: {
          type: 'linear',
          display: true,
          position: 'left',
          suggestedMax: maximumArea * (1 + 0.2), // Add 20 % buffer area to the top of the bars
          ticks: {
            callback(value: number) {
              return `${value / 1000000} ${unitLabel}`
            },
          },
        },
      },
    } as unknown as ChartOptions<'bar'>

    const plugins: Plugin[] = [
      whiteBackgroundplugin(), // Pluging to get a white background color when downloading
      displayPercentagesPlugin(), // Plugin to display the percentage on top of the bars.
    ]

    const data = {
      labels,
      datasets: [
        {
          label: 'Area',
          backgroundColor: backgroundColors,
          data: areas,
          yAxisID: 'Areas',
        },
      ],
    }

    return {
      data,
      error,
      isLoading,
      options,
      plugins,
    }
  }, [error, isLoading, t, tabularEstimationData, year])
}
