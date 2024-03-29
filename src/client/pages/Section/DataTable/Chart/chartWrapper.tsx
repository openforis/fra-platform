import React, { useEffect, useRef, useState } from 'react'

import { Table } from 'meta/assessment'
import { RecordCountryData } from 'meta/data'

import { useOnResize } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { DOMs } from 'client/utils/dom'

import ChartContainer from './chartContainer'

type Props = {
  data: RecordCountryData
  table: Table
}

const ChartWrapper = (props: Props) => {
  const { data, table } = props

  const { print } = useIsPrintRoute()

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(onChangeWidth, [window.innerWidth])

  // on mount and on resize, update width
  useOnResize(onChangeWidth, chartRef)

  return (
    <div ref={chartRef} className="chart__container">
      {width && <ChartContainer data={data} wrapperWidth={width} table={table} />}
    </div>
  )
}

export default ChartWrapper
