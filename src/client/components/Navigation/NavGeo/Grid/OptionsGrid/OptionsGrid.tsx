import './OptionsGrid.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>>

const OptionsGrid: React.FC<Props> = (props) => {
  const { children, className } = props

  return <div className={classNames('geo-options-grid', className)}>{React.Children.toArray(children)}</div>
}

export default OptionsGrid
