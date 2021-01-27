import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// @ts-ignore
import { Chart } from 'chart.js'

import { useI18n, useOnUpdate } from '@webapp/components/hooks'

type Props = {
  type: string
  options: any
  data: any
}

const ChartComponent = (props: Props) => {
  const { data, options, type } = props
  const canvasRef = useRef(null)
  const [chart, setChart] = useState(null)
  const i18n = useI18n()

  // on mount init chart
  useLayoutEffect(() => {
    const chartContext = canvasRef.current.getContext('2d')
    setChart(new Chart(chartContext, { type, data, options }))
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
    chart.update({ duration: 0, lazy: true })
  }, [i18n, data, options])

  return (
    <div className="chart">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default ChartComponent
