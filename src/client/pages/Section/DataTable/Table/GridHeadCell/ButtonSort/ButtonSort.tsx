import './ButtonSort.scss'
import React, { MouseEventHandler } from 'react'

import classNames from 'classnames'

import { useCycle } from 'client/store/meta/hooks/cycles'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { GridHeadCellProps } from 'client/pages/Section/DataTable/Table/GridHeadCell/types'

import { SortOrder } from '../../hooks/useTableSorting'

type Props = Pick<GridHeadCellProps, 'col' | 'onSort' | 'sortState'>

const ButtonSort: React.FC<Props> = (props) => {
  const { col, onSort, sortState } = props
  const cycle = useCycle()

  const sortColName = col.props.colNameSort?.[cycle.uuid]

  if (!sortColName) return null

  const isCurrentlySorted = sortState?.colName === sortColName
  const sortOrder = isCurrentlySorted ? sortState.order : SortOrder.NONE

  let iconName = 'sort-amount-asc'
  if (sortOrder === SortOrder.ASC) iconName = 'sort-amount-asc'
  if (sortOrder === SortOrder.DESC) iconName = 'sort-amount-desc'

  const onClick: MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.preventDefault()
    e.stopPropagation()
    if (sortColName) onSort?.(sortColName)
  }

  return (
    <Button
      className={classNames('grid-header-cell__button-sort', { active: isCurrentlySorted })}
      iconName={iconName}
      onClick={onClick}
      size={ButtonSize.m}
      type={ButtonType.transparent}
    />
  )
}

export default ButtonSort
