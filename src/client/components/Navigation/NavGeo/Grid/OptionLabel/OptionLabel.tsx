import './OptionLabel.scss'
import React, { PropsWithChildren } from 'react'

const OptionLabel: React.FC<PropsWithChildren> = (props) => {
  const { children } = props

  return <div className="geo-grid-option-label">{React.Children.toArray(children)}</div>
}

export default OptionLabel
