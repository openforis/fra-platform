import './style.scss'
import React from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import DataTrend from 'client/pages/Section/DataTable/Chart/DataTrend'
import Legend from 'client/pages/Section/DataTable/Chart/Legend'
import NoDataPlaceholder from 'client/pages/Section/DataTable/Chart/NoDataPlaceholder'
import OdpTicks from 'client/pages/Section/DataTable/Chart/OdpTicks'
import XAxis from 'client/pages/Section/DataTable/Chart/XAxis'
import YAxis from 'client/pages/Section/DataTable/Chart/YAxis'

import { useChartData } from './hooks/useChartData'
import { useTrends } from './hooks/useTrends'
import { useXScale } from './hooks/useXScale'
import { useYScale } from './hooks/useYScale'
import { Charts } from './charts'
import { ChartProps } from './types'

const Chart = (props: ChartProps) => {
  const { data, table, width } = props

  const { print } = useIsPrintRoute()
  const trends = useTrends({ table })
  const { trendsData, years } = useChartData({ data, table, trends })
  const xScale = useXScale({ years, width })
  const yScale = useYScale({ trendsData })

  return (
    <div>
      <svg height={Charts.styles.height} width={width}>
        <Legend trends={trends} trendsData={trendsData} width={width} />
        <YAxis trendsData={trendsData} width={width} yScale={yScale} />
        <XAxis xScale={xScale} years={years} />

        {/* odp ticks must be positioned behind all data points */}
        {trends.map((trend) => {
          const { name: trendName } = trend
          const trendData = trendsData[trendName]
          const key = `odp-ticks-${trendName}`
          return <OdpTicks key={key} trendData={trendData} xScale={xScale} yScale={yScale} />
        })}

        {trends.map((trend) => {
          const { name: trendName } = trend
          const trendData = trendsData[trendName]
          const key = `data-trend-${trendName}`
          return <DataTrend key={key} data={trendData} trend={trend} xScale={xScale} yScale={yScale} />
        })}

        {!print && <NoDataPlaceholder trendsData={trendsData} width={width} />}
      </svg>
    </div>
  )
}

export default Chart
