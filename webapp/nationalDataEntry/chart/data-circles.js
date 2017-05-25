import React from 'react'
import * as d3 from 'd3'
import R from 'ramda'

const renderCircles = ({xScale, yScale}) => {
  return (d, index) => {

    const circleProps = {
      cx: xScale(d.year),
      cy: yScale(d.forestArea),
      r: d.type === 'odp' ? 4 : 6,
      key: index
    }

    return (circleProps.cx && circleProps.cy) ? <circle {...circleProps}
                                                        fill={d.type === 'odp' ? '#189aa7' : '#FFF' }
                                                        stroke={d.type === 'odp' ? 'none' : '#333333' }
                                                        strokeWidth={d.type === 'odp' ? 0 : 1.5 }
    /> : null
  }
}

const renderLines = ({xScale, yScale, data}) => d3.line()
  .x((d) => xScale(d.year))
  .y((d) => yScale(d.forestArea))
  .curve(d3.curveLinear)
  (data)


const DataCircles = (props) => {

  return <g>
    <path d={renderLines({...props, data: R.filter(v => v.type === 'odp', props.data)})} style={{
      fill: 'none',
      stroke: '#a1a1a8',
      strokeWidth: 1.5,
      shapeRendering: 'geometricPrecision'
    }}></path>
    <path d={renderLines({...props, data: R.filter(v => v.type === 'fra', props.data)})} style={{
      fill: 'none',
      stroke: 'rgba(73,144,226,.35)',
      strokeWidth: 2.5,
      shapeRendering: 'geometricPrecision',
      strokeDasharray: '6,2'
    }}></path>
    { props.data.map(renderCircles(props)) }
  </g>

}

export default DataCircles
