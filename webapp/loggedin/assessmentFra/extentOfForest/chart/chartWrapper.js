import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { isPrintingMode } from '@webapp/loggedin/printAssessment/printAssessment'
import { elementOffset } from '@webapp/utils/domUtils'

import ChartContainer from './chartContainer'
import useOnResize from '@webapp/components/hooks/useOnResize'

const ChartWrapper = props => {
  const { fra, trends } = props

  const chartRef = useRef(null)
  const [width, setWidth] = useState(null)

  // on mount and on resize, update width
  useOnResize(() => {
    if (isPrintingMode()) {
      setWidth(960)
    } else {
      const { width } = elementOffset(chartRef.current)
      setWidth(width)
    }
  }, chartRef)

  return (
    <div ref={chartRef} className="chart__container">
      {
        width &&
        <ChartContainer
          fra={fra}
          wrapperWidth={width}
          trends={trends}
        />
      }
    </div>
  )
}

ChartWrapper.propTypes = {
  fra: PropTypes.array.isRequired,
  trends: PropTypes.array.isRequired,
}

export default ChartWrapper
