import './Tooltip.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  text: string
  error?: boolean
}

const Tooltip: React.FC<React.PropsWithChildren<Props>> = (props: React.PropsWithChildren<Props>) => {
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
