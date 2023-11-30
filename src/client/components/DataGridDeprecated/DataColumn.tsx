import './DataColumn.scss'
import React from 'react'

import classNames from 'classnames'

type Props = React.PropsWithChildren<{ className?: string; head?: boolean }>

/**
 * @deprecated
 */
const DataColumn: React.FC<Props> = (props: Props) => {
  const { children, className, head, ...rest } = props
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classNames('data-grid-column', className, { head })} {...rest}>
      {children}
    </div>
  )
}

DataColumn.defaultProps = {
  className: undefined,
  head: false,
}

export default DataColumn
