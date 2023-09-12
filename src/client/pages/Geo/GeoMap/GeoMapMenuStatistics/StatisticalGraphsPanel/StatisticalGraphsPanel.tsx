import './StatisticalGraphsPanel.scss'
import React, { useEffect, useState } from 'react'

import { Numbers } from 'utils/numbers'
import { ChartOptions, Plugin } from 'chart.js'

import { ExtraEstimation, extraEstimationsMetadata, ForestSource, sourcesMetadata } from 'meta/geo'

import Chart from 'client/components/Chart'
import { displayPercentagesPlugin, whiteBackgroundplugin } from 'client/pages/Geo/utils/chartPlugins'

type Props = {
  data: [string, number, number][]
  countryIso: string
  year: number
}

const StatisticalGraphsPanel: React.FC<Props> = (props: Props) => {
  const { data, countryIso, year } = props
  const chartTitle = `Extent of forest per source and reported on ${year} (1a)`
  const [chartDataState, setChartDataState] = useState(null)
  const [chartOptionsState, setChartOptionsState] = useState(null)
  const [chartPluginsState, setChartPluginsState] = useState(null)

  useEffect(() => {
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
      const source = row[0] as ForestSource | ExtraEstimation
      if (Object.values(ExtraEstimation).includes(source as ExtraEstimation)) {
        return extraEstimationsMetadata[source as ExtraEstimation].palette[0]
      }
      if (source.toUpperCase().indexOf(ForestSource.Hansen.toUpperCase()) === -1) {
        return sourcesMetadata[source as ForestSource].palette[0]
      }
      return sourcesMetadata.Hansen.palette[0]
    })

    const options = {
      percentages,
      backgroundColors,
      plugins: {
        tooltip: {
          callbacks: {
            label: (value: any) => `${Numbers.format(value?.parsed?.y, 0)} ha`,
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
              return `${value / 1000000} Million`
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
  }, [data, countryIso, year, chartTitle])

  return (
    <div className="statistical-graph-panel-container">
      <div>
        <div className="chart">
          {/* <canvas ref={canvasRef} /> */}
          {chartDataState && chartOptionsState && chartPluginsState && (
            <Chart type="bar" options={chartOptionsState} data={chartDataState} plugins={chartPluginsState} />
          )}
        </div>
      </div>
    </div>
  )
}

export default StatisticalGraphsPanel
