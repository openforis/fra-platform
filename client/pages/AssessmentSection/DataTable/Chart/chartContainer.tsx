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
  data: any // TableData
  trends: any
  // Array<{
  //   name: string
  //   label: string
  //   color: string
  // }>
  wrapperWidth: number
}

const _fra = [
  {
    id: '231',
    odpId: '231',
    year: 1990,
    countryIso: 'FIN',
    dataSourceMethods: null,
    forestArea: '21875.33000000000000000000',
    naturalForestArea: '17484.9512690000000000',
    otherPlantedForestArea: '4368.5034010000000000',
    otherWoodedLandArea: '925.90000000000000000000',
    plantationForestArea: '21.8753300000000000',
    plantationForestIntroducedArea: '21.8753300000000000',
    type: 'odp',
  },
  {
    id: '232',
    odpId: '232',
    year: 2000,
    countryIso: 'FIN',
    dataSourceMethods: null,
    forestArea: '22445.64000000000000000000',
    naturalForestArea: '17301.0993120000000000',
    otherPlantedForestArea: '5119.8504840000000000',
    otherWoodedLandArea: '823.48000000000000000000',
    plantationForestArea: '24.6902040000000000',
    plantationForestIntroducedArea: '24.6902040000000000',
    type: 'odp',
  },
  {
    id: '233',
    odpId: '233',
    year: 2010,
    countryIso: 'FIN',
    dataSourceMethods: null,
    forestArea: '22242.00000000000000000000',
    naturalForestArea: '15333.6348000000000000',
    otherPlantedForestArea: '6875.0022000000000000',
    otherWoodedLandArea: '789.00000000000000000000',
    plantationForestArea: '33.3630000000000000',
    plantationForestIntroducedArea: '33.3630000000000000',
    type: 'odp',
  },
  {
    id: '234',
    odpId: '234',
    year: 2015,
    countryIso: 'FIN',
    dataSourceMethods: null,
    forestArea: '22409.00000000000000000000',
    naturalForestArea: '15040.9208000000000000',
    otherPlantedForestArea: '7334.4657000000000000',
    otherWoodedLandArea: '746.00000000000000000000',
    plantationForestArea: '33.6135000000000000',
    plantationForestIntroducedArea: '33.6135000000000000',
    type: 'odp',
  },
  {
    forestArea: '22409.00',
    otherWoodedLand: '746.00',
    name: '2016',
    type: 'fra',
    year: 2016,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
  },
  {
    forestArea: '22409.00',
    otherWoodedLand: '746.00',
    name: '2017',
    type: 'fra',
    year: 2017,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
  },
  {
    forestArea: '22409.00',
    otherWoodedLand: '746.00',
    name: '2018',
    type: 'fra',
    year: 2018,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
  },
  {
    forestArea: '22409.00',
    otherWoodedLand: '746.00',
    name: '2019',
    type: 'fra',
    year: 2019,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
  },
  {
    forestArea: '22409.00',
    otherWoodedLand: '746.00',
    name: '2020',
    type: 'fra',
    year: 2020,
    forestAreaEstimated: true,
    otherWoodedLandEstimated: true,
  },
]
const _trends = [
  { name: 'forestArea', label: 'Forest', color: '#0098a6' },
  { name: 'otherWoodedLand', label: 'Other wooded land', color: '#bf00af' },
]

const ChartContainer = (props: ChartContainerProps) => {
  // const { data, trends, wrapperWidth } = props
  const { wrapperWidth } = props
  const data = _fra
  const trends = _trends

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
