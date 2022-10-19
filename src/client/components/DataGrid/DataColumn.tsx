import './DataColumn.scss'
import React from 'react'

import classNames from 'classnames'

type Props = React.PropsWithChildren<{ className?: string; head?: boolean }>

const DataColumn: React.FC<Props> = (props: Props) => {
  const { children, className, head } = props
  return <div className={classNames('data-grid-column', className, { head })}>{children}</div>
}

DataColumn.defaultProps = {
  className: undefined,
  head: false,
}

export default DataColumn
