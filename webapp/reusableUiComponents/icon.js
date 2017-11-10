import React from 'react'
import assert from 'assert'

export default props => {
  const svgClass = props.className || 'icon'
  const name = props.name
  assert(name, 'Icon name must be specified')
  return <svg className={svgClass}>
    <use xlinkHref={`img/icons.svg?bust=${__BUST__}#${name}`}/>
  </svg>
}
