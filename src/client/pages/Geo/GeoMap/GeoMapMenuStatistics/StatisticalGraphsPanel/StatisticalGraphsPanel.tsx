import './StatisticalGraphsPanel.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ChartOptions, Plugin } from 'chart.js'
import { Numbers } from 'utils/numbers'

import { ExtraEstimation, extraEstimationsMetadata, ForestKey, forestLayersMetadata } from 'meta/geo'

import Chart from 'client/components/Chart'
import { displayPercentagesPlugin, whiteBackgroundplugin } from 'client/pages/Geo/utils/chartPlugins'

type Props = {
  data: [string, number, number, string][]
  countryIso: string
  year: number
}

const StatisticalGraphsPanel: React.FC<Props> = (props: Props) => {
  const { data, countryIso, year } = props
  const { t } = useTranslation()

  const [chartDataState, setChartDataState] = useState(null)
  const [chartOptionsState, setChartOptionsState] = useState(null)
  const [chartPluginsState, setChartPluginsState] = useState(null)

  useEffect(() => {
    const chartTitle = t('geo.statistics.forestArea.extentOfForestPerSource', { year })
    const unitLabel = t('unit.haMillion')

    const labels = data.map((row) => {
      // Extract the labels from the first column of the data.
      return row[0]
    })

    const areas = data.map((row) => {
      // Extract the areas from the second column of the data.
      const area = row[1]
      return area
    })

    const maximumArea = Math.max(...areas)
    const percentages = data.map((row) => {
      // Extract the percentages from the third column of the data.
      const area = row[2]
      return area
    })

    const backgroundColors = data.map((row) => {
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
    setChartPluginsState(plugins)
    const chartData = {
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
    setChartDataState(chartData)
    setChartOptionsState(options)
  }, [countryIso, data, year, t])

  return (
    <div className="statistical-graph-panel-container">
      <div>
        <div className="chart">
          {/* <canvas ref={canvasRef} /> */}
          {chartDataState && chartOptionsState && chartPluginsState && (
            <Chart data={chartDataState} options={chartOptionsState} plugins={chartPluginsState} type="bar" />
          )}
        </div>
      </div>
    </div>
  )
}

export default StatisticalGraphsPanel
