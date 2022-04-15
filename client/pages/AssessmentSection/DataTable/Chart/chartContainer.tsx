import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'
import { TableData } from '@meta/data'

import DataTrend from './components/dataTrend'
import Legend from './components/legend'
import NoDataPlaceholder from './components/noDataPlaceholder'
import OdpTicks from './components/odpTicks'
import XAxis from './components/xAxis'
import YAxis from './components/yAxis'
import * as Chart from './chart'
import useChartData from './useChartData'
import './style.scss'

type ChartContainerProps = {
  data: TableData
  trends: Array<{
    name: string
    label: string
    color: string
  }>
  wrapperWidth: number
}

const toObject = (x) => {
  const newData = []
  Object.entries(x).map(([countryIso, countryValues]) => {
    Object.entries(countryValues).map(([section, sectionValues]) => {
      Object.entries(sectionValues).map(([year, yearValues]: any[]) => {
        newData.push({
          countryIso,
          section,
          year: Number(year),
          name: year,
          type: [1990, 2000, 2010, 2015].includes(Number(year)) ? 'odp' : 'fra',
          ...Object.keys(yearValues).reduce(
            (acc, key) => ({
              ...acc,
              [key === 'forest' ? 'forestArea' : key]: yearValues[key].raw,
              [`${key}Estimated`]: yearValues[key].estimated || false,
            }),
            {}
          ),
        })
      })
    })
  })
  return newData
}

const ChartContainer = (props: ChartContainerProps) => {
  const { data: x, trends, wrapperWidth } = props
  const data = toObject(x)

  const { i18n } = useTranslation()
  const [printView] = [false] // TODO usePrintView()
  const { xScale, yScale, chartData } = useChartData(data, trends, wrapperWidth)
  const { left, height, bottom } = Chart.styles

  return (
    <div>
      <svg width={wrapperWidth} height={height}>
        <Legend data={chartData} trends={trends} wrapperWidth={wrapperWidth} />
        <YAxis data={chartData} left={left} yScale={yScale} wrapperWidth={wrapperWidth} />
        <XAxis data={chartData} bottom={bottom} height={height} xScale={xScale} />
        {/* odp ticks must be positioned behind all data points */}
        {trends.map((t) => (
          <OdpTicks
            key={`odp-ticks-${t.name}`}
            // @ts-ignore
            className={`chart__odp-ticks-${t.name}`}
            xScale={xScale}
            yScale={yScale}
            data={Chart.getTrendOdps(chartData[t.name])}
          />
        ))}
        {trends.map((t) => (
          <DataTrend
            key={`data-trend-${t.name}`}
            className={`chart__data-trend-${t.name}`}
            color={t.color}
            data={chartData[t.name]}
            xScale={xScale}
            yScale={yScale}
            wrapperWidth={wrapperWidth}
          />
        ))}
        {!printView && <NoDataPlaceholder data={chartData} i18n={i18n} wrapperWidth={wrapperWidth} />}
      </svg>
    </div>
  )
}

const areEqual = (prevProps: any, nextProps: any) =>
  Objects.isEqual(prevProps.data, nextProps.data) && prevProps.wrapperWidth === nextProps.wrapperWidth

export default memo(ChartContainer, areEqual)
