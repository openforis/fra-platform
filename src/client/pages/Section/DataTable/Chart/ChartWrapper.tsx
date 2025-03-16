import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import Chart from 'client/pages/Section/DataTable/Chart/Chart'
import { DOMs } from 'client/utils/dom'

type Props = {
  data: RecordAssessmentData
  table: Table
}

const ChartWrapper = (props: Props) => {
  const { data, table } = props

  const { print } = useIsPrintRoute()

  const chartRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>()

  const updateWidth = useCallback(() => {
    if (print) {
      setWidth(960)
    }
    const { width: widthUpdate } = DOMs.elementOffset(chartRef.current)
    setWidth(widthUpdate)
  }, [print])

  useLayoutEffect(updateWidth, [updateWidth])

  // const onChangeWidth = useCallback(
  //   // @ts-ignore
  //   (entries, observer) => {
  //     console.log({ entries, observer })
  //     if (print) {
  //       setWidth(960)
  //     } else {
  //       const { width: widthUpdate } = DOMs.elementOffset(chartRef.current)
  //       setWidth(widthUpdate)
  //     }
  //   },
  //   [print]
  // )
  //
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(onChangeWidth, [window.innerWidth])
  //
  // // on mount and on resize, update width
  // useOnResize(onChangeWidth, chartRef)
  return (
    <div ref={chartRef} className="chart__container print-break-after">
      {width && <Chart data={data} table={table} width={width} />}
    </div>
  )
}

export default ChartWrapper
