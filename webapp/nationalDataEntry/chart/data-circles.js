import React from 'react'

const renderCircles = ({xScale, yScale}) => {
  return (coords, index) => {

    const circleProps = {
      cx: xScale(coords[0]),
      cy: yScale(coords[1]),
      r: 2,
      key: index
    }

    return <circle {...circleProps} />
  }
}

export default (props) => {
  return <g>{ props.data.map(renderCircles(props)) }</g>
}
