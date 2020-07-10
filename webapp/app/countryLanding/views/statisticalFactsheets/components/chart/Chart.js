import React, { useRef, useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'chart.js'

import { elementOffset } from '@webapp/utils/domUtils'
import { useIsMounted, useNavigationVisible } from '@webapp/components/hooks'

const ChartComponent = (props) => {
  const { data, options, type } = props
  const canvasRef = useRef(null)
  const [chart, setChart] = useState(null)

  const isMounted = useIsMounted()
  const navigationVisible = useNavigationVisible()
  useLayoutEffect(() => {
    const chartRef = canvasRef.current.getContext('2d')
    const chart2 = chart || new Chart(chartRef, { type, data, options })
    if (chart !== chart2) setChart(chart2)
    // We only need to destroy the instance when unmounting the component:
    return () => (!isMounted.current ? chart2.destroy : null)
  }, [chart, options, isMounted])

  // hack to make the charts responsive on navigationVisible change
  useLayoutEffect(() => {
    const { parentElement } = canvasRef.current
    const { width } = elementOffset(parentElement.parentElement)
    // 80 is the left+right padding of grand parent component -
    parentElement.style.width = `${width - 80}px`
  }, [navigationVisible])

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

ChartComponent.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default ChartComponent
