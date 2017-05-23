import React  from 'react'
import Axis   from './axis'
import * as d3 from 'd3'

const xyAxis = (props) => {

  const xSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    constructor: d3.axisBottom,
    scale: props.xScale
  }

  const ySettings = {
    translate: `translate(${props.padding}, 0)`,
    constructor: d3.axisLeft,
    scale: props.yScale
  }

  return <g className="xy-axis">
    <Axis {...xSettings}/>
    <Axis {...ySettings}/>
  </g>
}

export default xyAxis
