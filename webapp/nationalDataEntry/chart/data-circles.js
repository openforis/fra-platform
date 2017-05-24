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
                                                        fill={d.type === 'odp' ? '#189aa7' : 'none' }
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

const renderImage = ({data, width, padding}) => {
  return data.length <= 0 ? <g className="noDataPlaceholder">
    <image href="/img/tucan.svg"
           width="80" height="112"
           x={(width / 2) + padding - 40} y="96"></image>
  </g>
    : null
}

const DataCircles = (props) => {

  return <g>
    { renderImage(props) }
    <path d={renderLines({...props, data: R.filter(v => v.type === 'odp', props.data)})} style={{
      fill: 'none',
      stroke: '#acacb3',
      strokeWidth: 1.5,
      shapeRendering: 'geometricPrecision'
    }}></path>
    <path d={renderLines({...props, data: R.filter(v => v.type === 'fra', props.data)})} style={{
      fill: 'none',
      stroke: 'rgba(73,144,226,.6)',
      strokeWidth: 3,
      shapeRendering: 'geometricPrecision',
      strokeDasharray: '6,6'
    }}></path>
    { props.data.map(renderCircles(props)) }
  </g>

}

export default DataCircles
