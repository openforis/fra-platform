import React, { memo } from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import DataPath from './dataPath'
import DataPoints from './dataPoints'

import { getTrendOdps } from '../chart'

const hexToRgba = (hex: any, alpha: any) => {
  const hexEscape = hex.replace('#', '')
  const r = parseInt(hexEscape.substring(0, 2), 16)
  const g = parseInt(hexEscape.substring(2, 4), 16)
  const b = parseInt(hexEscape.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

type DataTrendProps = {
  className: string
  color: string
  data: any[]
  xScale: (...args: any[]) => any
  yScale: (...args: any[]) => any
}

const DataTrend = (props: DataTrendProps) => {
  const { className, color, data, xScale, yScale } = props
  const prev = (v: any) =>
    R.pipe(
      R.filter((d: any) => d.year <= v.year && d.type === 'fra'),
      R.prepend({}),
      R.last
    )(data)
  const next = (v: any) =>
    R.pipe(
      R.filter((d: any) => d.year >= v.year && d.type === 'fra'),
      R.head,
      R.defaultTo({})
    )(data)
  const fra = R.filter((v: any) => (v.type === 'odp' ? prev(v).estimated && next(v).estimated : true), data)

  return (
    <g className={className}>
      <DataPath
        data={fra}
        style={{
          fill: 'none',
          stroke: hexToRgba(color, 0.5),
          strokeWidth: 1.5,
          shapeRendering: 'geometricPrecision',
          strokeDasharray: '5,4',
        }}
        xScale={xScale}
        yScale={yScale}
      />
      <DataPath
        data={getTrendOdps(data)}
        style={{
          fill: 'none',
          stroke: hexToRgba(color, 0.75),
          strokeWidth: 2,
          shapeRendering: 'geometricPrecision',
        }}
        xScale={xScale}
        yScale={yScale}
      />

      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ color: string; data: any[]; xScale: (...ar... Remove this comment to see the full error message */}
      <DataPoints color={color} data={data} xScale={xScale} yScale={yScale} />
    </g>
  )
}

const areEqual = (prevProps: any, nextProps: any) => R.equals(prevProps.data, nextProps.data)
export default memo(DataTrend, areEqual)
