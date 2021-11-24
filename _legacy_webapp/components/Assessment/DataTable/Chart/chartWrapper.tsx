import React, { useEffect, useRef, useState } from 'react'

import { elementOffset } from '../../../../utils/domUtils'

import { useOnResize } from '../../../../hooks'
import { usePrintView } from '../../../../store/app'

import ChartContainer from './chartContainer'

type Props = {
  fra: any
  trends: any[]
}

const ChartWrapper = (props: Props) => {
  const { fra, trends } = props

  const [printView] = usePrintView()

  const chartRef = useRef(null)
  const [width, setWidth] = useState(null)

  const onChangeWidth = () => {
    if (printView) {
      setWidth(960)
    } else {
      const { width: widthUpdate } = elementOffset(chartRef.current)
      setWidth(widthUpdate)
    }
  }
  useEffect(onChangeWidth, [window.innerWidth])

  // on mount and on resize, update width
  useOnResize(onChangeWidth, chartRef)

  return (
    <div ref={chartRef} className="chart__container">
      {width && <ChartContainer fra={fra} wrapperWidth={width} trends={trends} />}
    </div>
  )
}

export default ChartWrapper
