import './DataGrid.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  className?: string
  style?: React.CSSProperties
}
const DataGrid: React.FC<React.PropsWithChildren<Props>> = (props: React.PropsWithChildren<Props>) => {
  const { children, className, style } = props
  return (
    <div className={classNames('data-grid', className)} style={style}>
      {children}
    </div>
  )
}

DataGrid.defaultProps = {
  className: undefined,
  style: undefined,
}

export default DataGrid
