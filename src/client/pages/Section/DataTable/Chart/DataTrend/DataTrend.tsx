import React from 'react'

import DataPath from 'client/pages/Section/DataTable/Chart/DataTrend/DataPath'
import DataPoints from 'client/pages/Section/DataTable/Chart/DataTrend/DataPoints'
import { D3ChartAxisScale, Trend, TrendData } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  data: TrendData
  trend: Trend
  xScale: D3ChartAxisScale
  yScale: D3ChartAxisScale
}

const DataTrend = (props: Props) => {
  const { data, trend, xScale, yScale } = props

  return (
    <g>
      <DataPath data={data} trend={trend} xScale={xScale} yScale={yScale} />
      <DataPoints data={data} trend={trend} xScale={xScale} yScale={yScale} />
    </g>
  )
}

export default DataTrend
