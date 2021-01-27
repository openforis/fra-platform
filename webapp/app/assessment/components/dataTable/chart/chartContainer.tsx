import './style.less'

import * as R from 'ramda'
import React, { memo } from 'react'

import { useI18n, usePrintView } from '@webapp/components/hooks'
import NoDataPlaceholder from './components/noDataPlaceholder'
import DataTrend from './components/dataTrend'
import XAxis from './components/xAxis'
import YAxis from './components/yAxis'
import OdpTicks from './components/odpTicks'
import Legend from './components/legend'

import * as Chart from './chart'
import useChartData from './useChartData'

type ChartContainerProps = {
  fra: any[]
  trends: any[]
  wrapperWidth: number
}

const ChartContainer = (props: ChartContainerProps) => {
  const { fra, trends, wrapperWidth } = props
  const i18n = useI18n()
  const [printView] = usePrintView()
  const { xScale, yScale, data } = useChartData(fra, trends, wrapperWidth)
  const { left, height, bottom } = Chart.styles

  return (
    <div>
      <svg width={wrapperWidth} height={height}>
        <Legend data={data} trends={trends} wrapperWidth={wrapperWidth} />
        <YAxis data={data} left={left} yScale={yScale} wrapperWidth={wrapperWidth} />
        <XAxis data={data} bottom={bottom} height={height} xScale={xScale} />
        {/* odp ticks must be positioned behind all data points */}
        {trends.map((t) => (
          <OdpTicks
            key={`odp-ticks-${t.name}`}
            // @ts-ignore
            className={`chart__odp-ticks-${t.name}`}
            xScale={xScale}
            yScale={yScale}
            data={Chart.getTrendOdps(data[t.name])}
          />
        ))}
        {trends.map((t) => (
          <DataTrend
            key={`data-trend-${t.name}`}
            className={`chart__data-trend-${t.name}`}
            color={t.color}
            data={data[t.name]}
            xScale={xScale}
            yScale={yScale}
          />
        ))}
        {!printView && <NoDataPlaceholder data={data} i18n={i18n} wrapperWidth={wrapperWidth} />}
      </svg>
    </div>
  )
}

const areEqual = (prevProps: any, nextProps: any) =>
  R.equals(prevProps.fra, nextProps.fra) && prevProps.wrapperWidth === nextProps.wrapperWidth

export default memo(ChartContainer, areEqual)
