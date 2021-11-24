import './tooltip.less'

import React from 'react'

type Props = {
  text: string
  children: any
  error?: any
}

const Tooltip = (props: Props) => {
  const { text, children, error } = props

  return (
    <div className={error ? 'error' : ''} data-tooltip={text}>
      {children}
    </div>
  )
}

export default Tooltip
