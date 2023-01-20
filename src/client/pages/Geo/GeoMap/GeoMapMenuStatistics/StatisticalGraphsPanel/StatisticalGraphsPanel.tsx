import './StatisticalGraphsPanel.scss'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { ChartOptions, Plugin } from 'chart.js'
import Chart from 'chart.js/auto'

import { ForestSource, sourcesMetadata } from '@meta/geo'

import Icon from '@client/components/Icon'
import { useDownloadChart } from '@client/pages/Geo/GeoMap/hooks'
import { displayPercentagesPlugin, whiteBackgroundplugin } from '@client/pages/Geo/utils/chartPlugins'

type Props = {
  data: [string, number, number][]
  countryIso: string
  year: number
}

const StatisticalGraphsPanel: React.FC<Props> = (props: Props) => {
  const { data, countryIso, year } = props
  const chartTitle = `Extent of forest per source and reported on ${year} (1a)`
  const canvasRef = useRef(null)
  const [chart, setChart] = useState(null)

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
    const source = row[0] as ForestSource
    if (source.toUpperCase().indexOf('REPORTED TO FRA') !== -1) {
      return '#000000' // Black for the Reported To FRA Bar.
    }
    if (source.toUpperCase().indexOf('HANSEN') === -1) {
      return sourcesMetadata[source].palette[0]
    }
    return sourcesMetadata.Hansen.palette[0]
  })

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

  const options = {
    plugins: {
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
    displayPercentagesPlugin(percentages, backgroundColors), // Plugin to display the percentage on top of the bars.
  ]

  // On mount init chart
  useLayoutEffect(() => {
    const chartContext = canvasRef.current.getContext('2d')
    setChart(new Chart(chartContext, { type: 'bar', data: chartData, options, plugins }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On unmount destroy chart
  useEffect(() => {
    return () => {
      if (chart) chart.destroy()
    }
  }, [chart])

  return (
    <div className="statistical-graph-panel-container">
      <div>
        <div className="chart">
          <canvas ref={canvasRef} />
        </div>
        <button
          onClick={useDownloadChart(chart, `extend_of_forest_${countryIso}_${year}.png`)}
          type="button"
          className="btn btn-primary geo-map-menu-statistics-btn-download"
        >
          <span>Download</span>
          <span>&nbsp;</span>
          <Icon className="icon-sub icon-white" name="hit-down" />
        </button>
      </div>
    </div>
  )
}

export default StatisticalGraphsPanel
