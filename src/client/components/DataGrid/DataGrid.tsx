import './DataGrid.scss'
import React from 'react'

import classNames from 'classnames'

type Props = {
  className?: string
}
const DataGrid: React.FC<React.PropsWithChildren<Props>> = (props: React.PropsWithChildren<Props>) => {
  const { children, className } = props
  return <div className={classNames('data-grid', className)}>{children}</div>
}

DataGrid.defaultProps = {
  className: undefined,
}

export default DataGrid
