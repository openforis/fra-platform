import React, { useEffect, useRef, useState } from 'react'

import { RecordCountryData } from '@meta/data'

import { useOnResize } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import { DOMs } from '@client/utils/dom'

import ChartContainer from './chartContainer'

type Props = {
  data: RecordCountryData
  trends: any[]
}

const ChartWrapper = (props: Props) => {
  const { data, trends } = props

  const { print } = useIsPrint()

  const chartRef = useRef(null)
  const [width, setWidth] = useState(null)

  const onChangeWidth = () => {
    if (print) {
      setWidth(960)
    } else {
      const { width: widthUpdate } = DOMs.elementOffset(chartRef.current)
      setWidth(widthUpdate)
    }
  }
  useEffect(onChangeWidth, [window.innerWidth])

  // on mount and on resize, update width
  useOnResize(onChangeWidth, chartRef)

  return (
    <div ref={chartRef} className="chart__container">
      {width && <ChartContainer data={data} wrapperWidth={width} trends={trends} />}
    </div>
  )
}

export default ChartWrapper
