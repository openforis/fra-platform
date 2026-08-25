import './DataCell.scss'
import React from 'react'
import classNames from 'classnames'

import { DataCellProps } from 'client/components/DataGrid/DataCell/types'
import WithTooltip from 'client/components/Tooltips/WithTooltip'

const DataCell: React.FC<DataCellProps> = (props) => {
  const { children, gridColumn, gridRow, style } = props
  // style props
  const {
    actions,
    className,
    dataTestId,
    editable,
    error,
    firstCol,
    firstHighlightCol,
    header,
    highlighted,
    id,
    lastCol,
    lastHighlightCol,
    lastRow,
    noBorder,
    tooltip,
  } = props
  // tooltip props

  return (
    <WithTooltip
      className={classNames(
        'data-cell',
        {
          actions,
          editable,
          error,
          firstCol,
          firstHighlightCol,
          header,
          highlighted,
          lastCol,
          lastHighlightCol,
          lastRow,
          noBorder,
        },
        className
      )}
      dataTestId={dataTestId}
      id={id}
      style={{ gridColumn, gridRow, ...style }}
      tooltip={tooltip}
    >
      {React.Children.toArray(children)}
    </WithTooltip>
  )
}

export default DataCell
