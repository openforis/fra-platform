import './Tooltip.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  text: string
  children: JSX.Element
  error?: boolean
}

const Tooltip: React.FC<Props> = (props) => {
  const { text, children, error } = props

  return (
    <div className={classNames({ error })} data-tooltip={text}>
      {children}
    </div>
  )
}

Tooltip.defaultProps = {
  error: false,
}

export default Tooltip
