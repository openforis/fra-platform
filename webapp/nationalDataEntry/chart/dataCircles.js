import React from 'react'
import * as d3 from 'd3'
import R from 'ramda'

const renderPoints = ({xScale, yScale}) => (d, index) => {

  const circleProps = {
    cx: xScale(d.year),
    cy: yScale(d.value),
    r: d.type === 'odp' ? 4 : 6,
    key: index
  }

  return (circleProps.cx && circleProps.cy)
    ? <circle {...circleProps}
              fill={d.type === 'fra' ? '#FFF' : d.type === 'odp' ? '#189aa7' : 'none' }
              stroke={d.type === 'fra' ? '#333333' : 'none'  }
              strokeWidth={d.type === 'fra' ? 1.5 : 0 }/>
    : null
}

const renderTrend = ({xScale, yScale, data}) => d3.line()
  .x((d) => xScale(d.year))
  .y((d) => yScale(d.value))
  .curve(d3.curveLinear)
  (data)

const renderOdpLines = ({xScale, yScale}) => (d, index) => {
  const lineProps = {
    x1: xScale(d.year),
    y1: yScale(0),
    x2: xScale(d.year),
    y2: yScale(d.value)
  }

  return <line key={index} {...lineProps} strokeWidth="1" stroke="rgba(0, 0, 0, 0.3)"></line>
}

const DataCircles = (props) => {
  const odps = R.filter(v => v.type === 'odp', props.data)

  const prev = v => R.pipe(R.filter(d => d.year <= v.year && d.type === 'fra'), R.reverse)(props.data)[0]
  const fra = R.filter(v => (v.type === 'odp') ? prev(v).estimated : true, props.data)

  return <g>
    <path d={renderTrend({...props, data: fra})}
          style={{
            fill: 'none',
            stroke: 'rgba(0,0,0,.2',
            strokeWidth: 2,
            shapeRendering: 'geometricPrecision',
            strokeDasharray: '5,4'
          }}></path>
    <path d={renderTrend({...props, data: odps})} style={{
      fill: 'none',
      stroke: 'rgba(24,154,167,.5)',
      strokeWidth: 2,
      shapeRendering: 'geometricPrecision'
    }}></path>
    { odps.map(renderOdpLines(props)) }
    { props.data.map(renderPoints(props)) }
  </g>

}

export default DataCircles
