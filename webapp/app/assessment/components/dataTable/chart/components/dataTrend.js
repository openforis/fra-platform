import React, { memo } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import DataPath from './dataPath'
import DataPoints from './dataPoints'

import { getTrendOdps } from '../chart'

const hexToRgba = (hex, alpha) => {
  const hexEscape = hex.replace('#', '')
  const r = parseInt(hexEscape.substring(0, 2), 16)
  const g = parseInt(hexEscape.substring(2, 4), 16)
  const b = parseInt(hexEscape.substring(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const DataTrend = (props) => {
  const { className, color, data, xScale, yScale } = props
  const prev = (v) =>
    R.pipe(
      R.filter((d) => d.year <= v.year && d.type === 'fra'),
      R.prepend({}),
      R.last
    )(data)
  const next = (v) =>
    R.pipe(
      R.filter((d) => d.year >= v.year && d.type === 'fra'),
      R.head,
      R.defaultTo({})
    )(data)
  const fra = R.filter((v) => (v.type === 'odp' ? prev(v).estimated && next(v).estimated : true), data)

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

DataTrend.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
}

const areEqual = (prevProps, nextProps) => R.equals(prevProps.data, nextProps.data)
export default memo(DataTrend, areEqual)
