import './DataCell.scss'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

import classNames from 'classnames'

type Props = PropsWithChildren<
  Pick<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'data-tooltip-content' | 'data-tooltip-html' | 'data-tooltip-id' | 'style'
  >
> &
  Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridColumn' | 'gridRow'> & {
    actions?: boolean
    editable?: boolean
    error?: boolean
    firstCol?: boolean
    firstHighlightCol?: boolean
    header?: boolean
    highlighted?: boolean
    lastCol?: boolean
    lastHighlightCol?: boolean
    lastRow?: boolean
    noBorder?: boolean
  }

const DataCell: React.FC<Props> = (props) => {
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
      style={{ gridColumn, gridRow, ...style }}
    >
      {React.Children.toArray(children)}
    </div>
  )
}

export default DataCell
