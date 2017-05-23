import React from 'react'
import * as d3 from 'd3'

const renderCircles = ({xScale, yScale}) => {
  return (coords, index) => {

    const circleProps = {
      cx: xScale(coords[0]),
      cy: yScale(coords[1]),
      r: 4,
      key: index
    }

    return (circleProps.cx && circleProps.cy) ? <circle {...circleProps} fill="#189aa7"/> : null
  }
}

const renderLines = ({xScale, yScale, data}) => d3.line()
  .x((d) => xScale(d[0]))
  .y((d) => yScale(d[1]))
  (data)

const linesStyle = {
  fill: 'none',
  stroke: '#acacb3',
  strokeWidth: 1.5,
  shapeRendering: 'geometricPrecision'
}

const DataCircles = (props) =>
  <g>
    <path d={renderLines(props)} style={linesStyle}></path>
    { props.data.map(renderCircles(props)) }
  </g>

export default DataCircles
