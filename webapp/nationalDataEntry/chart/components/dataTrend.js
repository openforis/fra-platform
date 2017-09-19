import React from 'react'
import R from 'ramda'
import DataPath from './dataPath'
import DataPoints from "./dataPoints";
import OdpTicks from './odpTicks'

const dataTrend = (props) => {
  const odps = R.filter(v => v.type === 'odp', props.data)

  const prev = v => R.pipe(R.filter(d => d.year <= v.year && d.type === 'fra'), R.prepend({}), R.last)(props.data)
  const next = v => R.pipe(R.filter(d => d.year >= v.year && d.type === 'fra'), R.head, x => x ? x : {})(props.data)
  const fra = R.filter(v => (v.type === 'odp') ? prev(v).estimated && next(v).estimated : true, props.data)

  return <g>
    <DataPath
      {...props}
      key="fra-path"
      data={fra}
      style={{
        fill: 'none',
        stroke: 'rgba(0,0,0,.2)',
        strokeWidth: 2,
        shapeRendering: 'geometricPrecision',
        strokeDasharray: '5,4'
      }}
    ></DataPath>
    <DataPath
      {...props}
      key="odps-path"
      data={odps}
      style={{
        fill: 'none',
        stroke: 'rgba(0,152,166,.5)',
        strokeWidth: 2,
        shapeRendering: 'geometricPrecision'
      }}
    ></DataPath>
    <DataPoints {...props}/>
    <OdpTicks {...props} data={odps}/>
  </g>
}

export default dataTrend
