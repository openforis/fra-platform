import './ButtonSort.scss'
import React, { MouseEventHandler } from 'react'

import { useCycle } from 'client/store/meta/hooks/cycles'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { GridHeadCellProps } from 'client/pages/Section/DataTable/Table/GridHeadCell/types'

import { SortOrder } from '../../hooks/useTableSorting'

type Props = Pick<GridHeadCellProps, 'col' | 'onSort' | 'sortState'>

const ButtonSort: React.FC<Props> = (props) => {
  const { col, onSort, sortState } = props

  const cycle = useCycle()

  const sortColName = col.props.sortable?.[cycle.uuid]

  const isCurrentlySorted = sortState?.colName === sortColName
  const sortOrder = isCurrentlySorted ? sortState.order : SortOrder.NONE

  if (!sortColName) return null

  let label = '↕'
  if (sortOrder === SortOrder.ASC) label = '↑'
  if (sortOrder === SortOrder.DESC) label = '↓'

  const onClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    e.stopPropagation()
    if (sortColName) onSort?.(sortColName)
  }

  return (
    <Button
      className="grid-header-cell__button-sort"
      // iconName={iconName}
      label={label}
      onClick={onClick}
      size={ButtonSize.m}
      type={ButtonType.transparent}
    />
  )
}

export default ButtonSort
