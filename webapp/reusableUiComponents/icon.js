import React from 'react'
import PropTypes from 'prop-types'
import bustString from './cacheBust'

const Icon = props => {
  const svgClass = props.className
    ? 'icon ' + props.className
    : 'icon'
  const name = props.name
  return <svg xmlns="http://www.w3.org/2000/svg" className={svgClass}>
    <use xlinkHref={`/img/icons.svg?bust=${bustString}#${name}`} />
  </svg>
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon