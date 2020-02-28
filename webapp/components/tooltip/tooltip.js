import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Tooltip = ({ text, children, error }) => {
  return <div className={ error ? 'error' : '' } data-tooltip={text}>
    {children}
  </div>
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
}

export default Tooltip
