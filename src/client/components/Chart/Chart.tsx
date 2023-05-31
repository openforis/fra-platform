import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ChartData, ChartOptions, DefaultDataPoint, Plugin } from 'chart.js'
import Chart, { ChartTypeRegistry } from 'chart.js/auto'

import { useOnUpdate } from 'client/hooks'

export type ChartDataType = ChartData<keyof ChartTypeRegistry, DefaultDataPoint<keyof ChartTypeRegistry>, unknown>

type Props = {
  type: string
  options: ChartOptions<keyof ChartTypeRegistry>
  data: ChartDataType
  plugins?: Plugin[]
}

const ChartComponent = (props: Props) => {
  const { data, options, type, plugins } = props
  const canvasRef = useRef(null)
  const [chart, setChart] = useState(null)
  const { i18n } = useTranslation()

  // on mount init chart
  useLayoutEffect(() => {
    const chartContext = canvasRef.current.getContext('2d')
    setChart(new Chart(chartContext, { type: type as keyof ChartTypeRegistry, data, options, plugins }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // on unmount destroy chart
  useEffect(() => {
    return () => {
      if (chart) chart.destroy()
    }
  }, [chart])

  // update chart to reflect labels update
  useOnUpdate(() => {
    chart.data = data
    chart.options = options
    chart.plugins = plugins
    chart.update({ duration: 0, lazy: true })
  }, [i18n.language, data, options, plugins])

  return (
    <div className="chart">
      <canvas ref={canvasRef} />
    </div>
  )
}

ChartComponent.defaultProps = {
  plugins: [],
}

export default ChartComponent
