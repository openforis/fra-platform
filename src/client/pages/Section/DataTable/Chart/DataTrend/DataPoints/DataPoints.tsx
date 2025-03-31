import './DataPoints.scss'
import React, { useRef } from 'react'

import { D3ChartAxisScale, Trend, TrendData } from 'client/pages/Section/DataTable/Chart/types'

import { usePointsTransition } from './hooks/usePointsTransition'

type Props = {
  data: TrendData
  trend: Trend
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

const DataPoints: React.FC<Props> = (props) => {
  const { data, trend, xScale, yScale } = props

  const containerRef = useRef<SVGGElement>()
  usePointsTransition({ containerRef, data, trend, xScale, yScale })

  return <g ref={containerRef} className="chart__data-points" />
}

export default DataPoints
