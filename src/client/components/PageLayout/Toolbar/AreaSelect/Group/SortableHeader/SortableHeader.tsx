import './SortableHeader.scss'
import React, { useCallback } from 'react'
import classNames from 'classnames'

import { useAppDispatch } from 'client/store/hooks'
import { AreaSelectorActions } from 'client/store/ui/areaSelector/actions'
import { useAreaSelectorFilters } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { AreaSelectorSortBy, AreaSelectorSortDirection } from 'client/store/ui/areaSelector/state'
import Icon from 'client/components/Icon'

type Props = {
  label: string
  sortByProperty: AreaSelectorSortBy
}

const SortableHeader: React.FC<Props> = (props) => {
  const { label, sortByProperty } = props

  const dispatch = useAppDispatch()
  const { sortBy, sortDirection } = useAreaSelectorFilters()

  const active = sortBy === sortByProperty
  const iconName = active && sortDirection === AreaSelectorSortDirection.asc ? 'sort-amount-asc' : 'sort-amount-desc'

  const onClick = useCallback(() => {
    dispatch(AreaSelectorActions.setSortBy(sortByProperty))
  }, [dispatch, sortByProperty])

  return (
    <button className={classNames('area-select__group-heading-sortable', { active })} onClick={onClick} type="button">
      <Icon name={iconName} />
      {label}
    </button>
  )
}

export default SortableHeader
