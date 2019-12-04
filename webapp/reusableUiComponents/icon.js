import React from 'react'
import assert from 'assert'
import bustString from './cacheBust'

export default props => {
  const svgClass = props.className
    ? 'icon ' + props.className
    : 'icon'
  const name = props.name
  assert(name, 'Icon name must be specified')
  return <svg xmlns="http://www.w3.org/2000/svg" className={svgClass}>
    <use xlinkHref={`/img/icons.svg?bust=${bustString}#${name}`}/>
  </svg>
}
