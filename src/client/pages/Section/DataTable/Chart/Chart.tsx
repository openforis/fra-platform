import './style.scss'
import React from 'react'

import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import NoDataPlaceholder from 'client/pages/Section/DataTable/Chart/NoDataPlaceholder'
import YAxis from 'client/pages/Section/DataTable/Chart/YAxis'

import DataTrend from './components/dataTrend'
import Legend from './components/legend'
import OdpTicks from './components/odpTicks'
import XAxis from './components/xAxis'
import { useChartData } from './hooks/useChartData'
import { useTrends } from './hooks/useTrends'
import { useXScale } from './hooks/useXScale'
import { useYScale } from './hooks/useYScale'
import * as charts from './charts'
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
        <Legend data={trendsData} trends={trends} wrapperWidth={width} />
        <YAxis trendsData={trendsData} width={width} yScale={yScale} />
        <XAxis bottom={Charts.styles.bottom} data={trendsData} height={Charts.styles.height} xScale={xScale} />
        {/* odp ticks must be positioned behind all data points */}
        {trends.map((t) => (
          <OdpTicks
            key={`odp-ticks-${t.name}`}
            className={`chart__odp-ticks-${t.name}`}
            data={charts.getTrendOdps(trendsData?.[t.name])}
            xScale={xScale}
            yScale={yScale}
          />
        ))}
        {trends.map((t) => (
          <DataTrend
            key={`data-trend-${t.name}`}
            className={`chart__data-trend-${t.name}`}
            color={t.color}
            data={trendsData?.[t.name]}
            xScale={xScale}
            yScale={yScale}
          />
        ))}
        {!print && <NoDataPlaceholder trendsData={trendsData} width={width} />}
      </svg>
    </div>
  )
}

export default Chart
