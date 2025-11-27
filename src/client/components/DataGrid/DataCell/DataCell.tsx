import './DataCell.scss'
import React from 'react'
import classNames from 'classnames'

import { DataCellProps } from 'client/components/DataGrid/DataCell/types'

const DataCell: React.FC<DataCellProps> = (props) => {
  const { children, gridColumn, gridRow, style } = props
  // style props
  const {
    actions,
    className,
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
  } = props
  // tooltip props
  const {
    'data-tooltip-content': dataTooltipContent,
    'data-tooltip-html': dataTooltipHtml,
    'data-tooltip-id': dataTooltipId,
  } = props
  const tooltipId = dataTooltipContent || dataTooltipHtml ? dataTooltipId : null

  return (
    <div
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
      data-tooltip-content={dataTooltipContent}
      data-tooltip-html={dataTooltipHtml}
      data-tooltip-id={tooltipId}
      id={id}
      style={{ gridColumn, gridRow, ...style }}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

export default DataCell
