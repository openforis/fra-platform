import React from 'react'
import assert from 'assert'
const uuidv4 = require('uuid/v4')

let bustString = uuidv4()
// For some reason, incremental build with watch loses
// the __BUST__ configured with DefinePlugin in webpack
// config. With this we'll fallback to uuidv4 which
// is set when the page is loaded. This is only a local
// issue for developers and only causes the svgs to
// reload when the page is reloaded
try { bustString = __BUST__ } catch (e) {}

export default props => {
  const svgClass = props.className
    ? 'icon ' + props.className
    : 'icon'
  const name = props.name
  assert(name, 'Icon name must be specified')
  return <svg className={svgClass}>
    <use xlinkHref={`img/icons.svg?bust=${bustString}#${name}`}/>
  </svg>
}
