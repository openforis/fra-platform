import './Tooltip.scss'

import React from 'react'

type Props = {
  text: string
  children: any
  error?: boolean
}

function Tooltip(props: Props) {
  const { text, children, error } = props

  return (
    <div className={error ? 'error' : ''} data-tooltip={text}>
      {children}
    </div>
  )
}

Tooltip.defaultProps = {
  error: false,
}

export default Tooltip
