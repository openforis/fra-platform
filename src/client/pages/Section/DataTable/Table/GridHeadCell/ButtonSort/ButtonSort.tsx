import './ButtonSort.scss'
import React, { MouseEventHandler } from 'react'
import classNames from 'classnames'

import { useCycle } from 'client/store/meta/hooks/cycles'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { IconName } from 'client/components/Icon/types'
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

  const iconName = sortOrder === SortOrder.DESC ? IconName.sortAmountDesc : IconName.sortAmountAsc

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
