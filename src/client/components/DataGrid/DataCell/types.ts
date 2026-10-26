import { HTMLAttributes, PropsWithChildren } from 'react'

import { TooltipProps } from 'client/components/Tooltips/type'

type DivElementProps = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'id' | 'style'>

type DivTooltipProps = { tooltip?: TooltipProps }

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
  DivElementProps & DivTooltipProps & GridPlacementProps & DataCellStateProps & { dataTestId?: string }
>
