import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'chart.js'

const ChartComponent = (props) => {
  const { data, options, chartUpdateFunction, id, type } = props
  const canvasRef = useRef(null)
  const [chart, setChart] = useState(null)

  const componentIsMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  useEffect(() => {
    const chartRef = canvasRef.current.getContext('2d')
    const chart2 = chart || new Chart(chartRef, { type, data, options })
    if (chart !== chart2) setChart(chart2)
    if (chartUpdateFunction) chartUpdateFunction(chart2)
    // We only need to destroy the instance when unmounting the component:
    return () => (!componentIsMounted.current ? chart2.destroy : null)
  }, [canvasRef, chart, options, chartUpdateFunction, componentIsMounted])

  return (
    <div>
      <canvas id={id} ref={canvasRef} />
    </div>
  )
}

ChartComponent.defaultProps = {
  id: 'chart',
  chartUpdateFunction: null,
}

ChartComponent.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  chartUpdateFunction: PropTypes.func,
  options: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default ChartComponent
