import React from 'react'
import * as R from 'ramda'
import DataPath from './dataPath'
import DataPoints from './dataPoints'

import { getTrendOdps } from '../chart'

const hexToRgba = (hex, alpha) => {
    hex = hex.replace('#','')
    var r = parseInt(hex.substring(0,2), 16)
    var g = parseInt(hex.substring(2,4), 16)
    var b = parseInt(hex.substring(4,6), 16)
    var result = `rgba(${r},${g},${b},${alpha})`
    return result
}

const dataTrend = (props) => {
  const prev = v => R.pipe(R.filter(d => d.year <= v.year && d.type === 'fra'), R.prepend({}), R.last)(props.data)
  const next = v => R.pipe(R.filter(d => d.year >= v.year && d.type === 'fra'), R.head, x => x ? x : {})(props.data)
  const fra = R.filter(v => (v.type === 'odp') ? prev(v).estimated && next(v).estimated : true, props.data)

  return <g className={props.className}>
    <DataPath
      {...props}
      key="fra-path"
      data={fra}
      style={{
        fill: 'none',
        stroke: hexToRgba(props.color, 0.5),
        strokeWidth: 1.5,
        shapeRendering: 'geometricPrecision',
        strokeDasharray: '5,4'
      }}
    ></DataPath>
    <DataPath
      {...props}
      key="odps-path"
      data={getTrendOdps(props.data)}
      style={{
        fill: 'none',
        stroke: hexToRgba(props.color, 0.75),
        strokeWidth: 2,
        shapeRendering: 'geometricPrecision'
      }}
    ></DataPath>

    <DataPoints {...props}/>
  </g>
}

export default dataTrend
