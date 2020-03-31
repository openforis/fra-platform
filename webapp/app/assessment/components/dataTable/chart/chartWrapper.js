import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { elementOffset } from '@webapp/utils/domUtils'

import * as AppState from '@webapp/app/appState'

import useOnResize from '@webapp/components/hooks/useOnResize'

import ChartContainer from './chartContainer'

const ChartWrapper = (props) => {
  const { fra, trends } = props

  const printView = useSelector(AppState.isPrintView)

  const chartRef = useRef(null)
  const [width, setWidth] = useState(null)

  // on mount and on resize, update width
  useOnResize(() => {
    if (printView) {
      setWidth(960)
    } else {
      const { width: widthUpdate } = elementOffset(chartRef.current)
      setWidth(widthUpdate)
    }
  }, chartRef)

  return (
    <div ref={chartRef} className="chart__container">
      {width && <ChartContainer fra={fra} wrapperWidth={width} trends={trends} />}
    </div>
  )
}

ChartWrapper.propTypes = {
  fra: PropTypes.array.isRequired,
  trends: PropTypes.array.isRequired,
}

export default ChartWrapper
