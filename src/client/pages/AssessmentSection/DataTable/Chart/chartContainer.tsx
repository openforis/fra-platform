import './style.scss'
import React, { memo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { RecordCountryData } from 'meta/data'

import { useCountryIso } from 'client/hooks'
import { useIsPrint } from 'client/hooks/useIsPath'

import DataTrend from './components/dataTrend'
import Legend from './components/legend'
import NoDataPlaceholder from './components/noDataPlaceholder'
import OdpTicks from './components/odpTicks'
import XAxis from './components/xAxis'
import YAxis from './components/yAxis'
import useChartData from './hooks/useChartData'
import { useTrends } from './hooks/useTrends'
import * as Chart from './chart'

type ChartContainerProps = {
  data: RecordCountryData
  table: Table
  wrapperWidth: number
}

const toObject = (tableData: RecordCountryData, countryIso: CountryIso): Array<Record<string, string | number>> => {
  const newData: Array<Record<string, string | number>> = []
  const countryValues = tableData?.[countryIso]
  if (!countryValues) return []

  Object.entries(countryValues).forEach(([section, sectionValues]) => {
    Object.entries(sectionValues).forEach(([year, yearValues]: any[]) => {
      // Display chart for section 1a and 1b
      if (!['extentOfForest', 'forestCharacteristics'].includes(section)) return
      newData.push({
        countryIso,
        section,
        year: Number(year),
        name: year,
        ...Object.keys(yearValues).reduce(
          (acc, key) => ({
            ...acc,
            [key === 'forest' ? 'forestArea' : key]: yearValues[key].raw,
            [`${key}Estimated`]: yearValues[key].estimated || false,
            type: yearValues[key].odp ? 'odp' : 'fra',
          }),
          {}
        ),
      })
    })
  })
  return newData
}

const ChartContainer = (props: ChartContainerProps) => {
  const { data: _data, table, wrapperWidth } = props

  const countryIso = useCountryIso()
  const data = toObject(_data, countryIso)
  const { print } = useIsPrint()
  const trends = useTrends({ table })
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
          />
        ))}
        {!print && <NoDataPlaceholder data={chartData} wrapperWidth={wrapperWidth} />}
      </svg>
    </div>
  )
}

const areEqual = (prevProps: any, nextProps: any) =>
  Objects.isEqual(prevProps.data, nextProps.data) && prevProps.wrapperWidth === nextProps.wrapperWidth

export default memo(ChartContainer, areEqual)
