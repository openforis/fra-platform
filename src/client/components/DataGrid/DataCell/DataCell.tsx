import './DataCell.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<
  Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'data-tooltip-content' | 'data-tooltip-id'>
> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridColumn' | 'gridRow'> & {
    actions?: boolean
    editable?: boolean
    error?: boolean
    header?: boolean
    lastCol?: boolean
    lastRow?: boolean
    noBorder?: boolean
  }

const DataCell: React.FC<Props> = (props) => {
  const { children, gridColumn, gridRow } = props
  // style props
  const { actions, className, editable, error, header, lastCol, lastRow, noBorder } = props
  // tooltip props
  const { 'data-tooltip-content': dataTooltipContent, 'data-tooltip-id': dataTooltipId } = props

  return (
    <div
      className={classNames('data-cell', { editable, error, header, lastCol, lastRow, noBorder, actions }, className)}
      data-tooltip-content={dataTooltipContent}
      data-tooltip-id={dataTooltipId}
      style={{ gridColumn, gridRow }}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

DataCell.defaultProps = {
  actions: false,
  editable: false,
  error: false,
  header: false,
  lastCol: false,
  lastRow: false,
  noBorder: false,
}

export default DataCell
