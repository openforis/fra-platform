import './DataCell.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridColumn' | 'gridRow'> & {
    bordered?: boolean
    editable?: boolean
    error?: boolean
    header?: boolean
    lastCol?: boolean
    lastRow?: boolean
    review?: boolean
  }

const DataCell: React.FC<Props> = (props) => {
  const { children, className, gridColumn, gridRow } = props
  // style props
  const { bordered, editable, error, header, lastCol, lastRow, review } = props

  return (
    <div
      className={classNames('data-cell', { bordered, editable, error, header, lastCol, lastRow, review }, className)}
      style={{ gridColumn, gridRow }}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

DataCell.defaultProps = {
  bordered: false,
  editable: false,
  error: false,
  header: false,
  lastCol: false,
  lastRow: false,
  review: false,
}

export default DataCell
