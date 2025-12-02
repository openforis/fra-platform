import { HTMLAttributes, PropsWithChildren } from 'react'

type DivElementProps = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'id' | 'style'>

type DivTooltipProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'data-tooltip-content' | 'data-tooltip-html' | 'data-tooltip-id'
>

type GridPlacementProps = Pick<HTMLAttributes<HTMLDivElement>['style'], 'gridColumn' | 'gridRow'>

type DataCellStateProps = {
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

export type DataCellProps = PropsWithChildren<
  DivElementProps & DivTooltipProps & GridPlacementProps & DataCellStateProps
>
