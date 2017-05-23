import React from 'react'

const renderCircles = ({xScale, yScale}) => {
  return (coords, index) => {

    const circleProps = {
      cx: xScale(coords[0]),
      cy: yScale(coords[1]),
      r: 3.5,
      key: index
    }

    return (circleProps.cx && circleProps.cy) ? <circle {...circleProps} fill="#138C97" /> : null
  }
}

const DataCircles = (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}

export default DataCircles
