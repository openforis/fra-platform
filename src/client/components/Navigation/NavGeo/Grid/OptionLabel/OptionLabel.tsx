import './OptionLabel.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>>

const OptionLabel: React.FC<Props> = (props) => {
  const { children, className } = props

  return <div className={classNames('geo-grid-option-label', className)}>{React.Children.toArray(children)}</div>
}

export default OptionLabel
