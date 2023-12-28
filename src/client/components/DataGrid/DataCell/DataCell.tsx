import './DataCell.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridColumn' | 'gridRow'> & {
    editable?: boolean
    error?: boolean
    header?: boolean
    lastCol?: boolean
    lastRow?: boolean
    noBorder?: boolean
    review?: boolean
  }

const DataCell: React.FC<Props> = (props) => {
  const { children, gridColumn, gridRow } = props
  // style props
  const { className, editable, error, header, lastCol, lastRow, noBorder, review } = props

  return (
    <div
      className={classNames('data-cell', { editable, error, header, lastCol, lastRow, noBorder, review }, className)}
      style={{ gridColumn, gridRow }}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

DataCell.defaultProps = {
  editable: false,
  error: false,
  header: false,
  lastCol: false,
  lastRow: false,
  noBorder: false,
  review: false,
}

export default DataCell
