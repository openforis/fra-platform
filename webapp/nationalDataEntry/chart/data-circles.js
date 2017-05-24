import React from 'react'
import * as d3 from 'd3'

const renderCircles = ({xScale, yScale}) => {
  return (d, index) => {

    const circleProps = {
      cx: xScale(d.year),
      cy: yScale(d.forestArea),
      r: 4,
      key: index
    }

    return (circleProps.cx && circleProps.cy) ?
      <circle {...circleProps} fill={d.type === 'odp' ? '#189aa7' : '#666666' }/> : null
  }
}

const renderLines = ({xScale, yScale, data}) => d3.line()
  .x((d) => xScale(d.year))
  .y((d) => yScale(d.forestArea))
  (data)

const DataCircles = (props) =>
  <g>
    <path d={renderLines(props)} style={{
      fill: 'none',
      stroke: '#acacb3',
      strokeWidth: 1.5,
      shapeRendering: 'geometricPrecision'
    }}></path>
    { props.data.map(renderCircles(props)) }
  </g>

export default DataCircles
