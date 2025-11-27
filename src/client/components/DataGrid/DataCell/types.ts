import { HTMLAttributes, PropsWithChildren } from 'react'

export type DataCellProps = PropsWithChildren<
  Pick<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'data-tooltip-content' | 'data-tooltip-html' | 'data-tooltip-id' | 'id' | 'style'
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
