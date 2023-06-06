import React, { memo } from 'react'

import { Objects } from 'utils/objects'

import { getTrendOdps } from '../chart'
import DataPath from './dataPath'
import DataPoints from './dataPoints'

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
  const { className, color, data, xScale, yScale }: any = props

  const prev = (v: any) => data.filter((d: any) => d.year <= v.year && d.type === 'fra') ?? {}
  const next = (v: any) => data.filter((d: any) => d.year >= v.year && d.type === 'fra') ?? {}

  const fra = data.filter((d) => (d.type === 'dp' ? prev(d).estimated && next(d).estimated : true))

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

      <DataPoints color={color} data={data} xScale={xScale} yScale={yScale} />
    </g>
  )
}

const areEqual = (prevProps: any, nextProps: any) =>
  Objects.isEqual(prevProps.data, nextProps.data) && prevProps.wrapperWidth === nextProps.wrapperWidth

export default memo(DataTrend, areEqual)
