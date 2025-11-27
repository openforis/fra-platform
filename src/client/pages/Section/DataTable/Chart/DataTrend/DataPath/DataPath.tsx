import React, { useRef } from 'react'

import { D3ChartAxisScale, Trend, TrendData } from 'client/pages/Section/DataTable/Chart/types'

import { usePathTransition } from './hooks/usePathTransition'
import { useStyle } from './hooks/useStyle'

type Props = {
  data: TrendData
  trend: Trend
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

const DataPath = (props: Props): React.ReactElement => {
  const { data, trend, xScale, yScale } = props

  const pathRef = useRef<SVGPathElement>(null)

  const style = useStyle({ trend })
  usePathTransition({ data, trend, pathRef, xScale, yScale })

  return <path ref={pathRef} className="chart__data-path" d={null} style={style} />
}

export default DataPath
