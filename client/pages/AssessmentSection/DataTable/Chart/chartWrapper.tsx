import React, { useEffect, useRef, useState } from 'react'

import { useOnResize } from '@client/hooks'
import { elementOffset } from '@client/utils/domUtils'
import { TableData } from '@meta/data'

import ChartContainer from './chartContainer'

type Props = {
  data: TableData
  trends: any[]
}

const ChartWrapper = (props: Props) => {
  const { data, trends } = props

  const [printView] = [false] // TODO usePrintView()

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

  console.log(data, width, trends)

  return (
    <div ref={chartRef} className="chart__container">
      {width && <ChartContainer data={data} wrapperWidth={width} trends={trends} />}
    </div>
  )
}

export default ChartWrapper
